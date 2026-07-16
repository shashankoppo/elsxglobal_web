import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { createClient } = await import("npm:@supabase/supabase-js@2.58.0");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing auth header" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { action, planSlug, billingCycle, domain, couponCode, orderId, paymentId, paymentMethod, addonSlugs } = body;

    // Create order
    if (action === "create-order") {
      const { data: plan } = await supabase
        .from("hosting_plans").select("*").eq("slug", planSlug).eq("is_active", true).maybeSingle();

      if (!plan) {
        return new Response(JSON.stringify({ error: "Plan not found" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const basePrice = billingCycle === "annual" ? plan.price_annual / 12 : plan.price_monthly;

      // Fetch add-ons if provided
      let addonsTotal = 0;
      const addonRecords: { id: string; name: string; price: number }[] = [];
      if (Array.isArray(addonSlugs) && addonSlugs.length > 0) {
        const { data: addons } = await supabase
          .from("hosting_addons").select("*").in("slug", addonSlugs).eq("is_active", true);
        for (const addon of addons || []) {
          const addonPrice = billingCycle === "annual" ? addon.price_annual / 12 : addon.price_monthly;
          addonsTotal += addonPrice;
          addonRecords.push({ id: addon.id, name: addon.name, price: addonPrice });
        }
      }

      const subtotal = basePrice + addonsTotal;
      const discount = couponCode === "VAULT10" ? subtotal * 0.1 : 0;
      const taxableAmount = subtotal - discount;
      const tax = taxableAmount * 0.18;
      const total = taxableAmount + tax;

      const { data: order, error: orderError } = await supabase
        .from("hosting_orders").insert({
          user_id: userData.user.id, plan_id: plan.id, plan_name: plan.name, plan_tier: plan.tier,
          billing_cycle: billingCycle, quantity: 1, subtotal, discount_amount: discount,
          tax_amount: tax, total, currency: "INR", status: "pending", payment_method: "razorpay",
          domain: domain || null,
        }).select().single();

      if (orderError) {
        return new Response(JSON.stringify({ error: "Failed to create order: " + orderError.message }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Link add-ons to order
      if (addonRecords.length > 0) {
        const addonInserts = addonRecords.map((a) => ({
          order_id: order.id, addon_id: a.id, addon_name: a.name,
          price: a.price, billing_cycle: billingCycle,
        }));
        await supabase.from("hosting_order_addons").insert(addonInserts);
      }

      // Try Razorpay API
      const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
      const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

      if (razorpayKeyId && razorpayKeySecret) {
        const amountInPaise = Math.round(total * 100);
        const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(razorpayKeyId + ":" + razorpayKeySecret),
          },
          body: JSON.stringify({
            amount: amountInPaise, currency: "INR", receipt: order.id,
            notes: { order_id: order.id, plan: plan.name, user_email: userData.user.email || "" },
          }),
        });

        if (rzpRes.ok) {
          const rzpOrder = await rzpRes.json();
          await supabase.from("hosting_orders").update({ payment_id: rzpOrder.id }).eq("id", order.id);
          return new Response(JSON.stringify({
            orderId: order.id, razorpayOrderId: rzpOrder.id, razorpayKeyId,
            amount: amountInPaise, currency: "INR", planName: plan.name, razorpayConfigured: true,
          }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      }

      // Fallback: manual payment details
      return new Response(JSON.stringify({
        orderId: order.id, amount: total, currency: "INR", planName: plan.name, razorpayConfigured: false,
        upiId: "elsxglobal@upi",
        bankDetails: { accountName: "ELSxGlobal Solutions", accountNumber: "XXXXXXXXXXXX", ifsc: "ICIC0000000", bank: "ICICI Bank" },
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Verify payment
    if (action === "verify-payment") {
      const { data: order } = await supabase.from("hosting_orders").select("*").eq("id", orderId).maybeSingle();
      if (!order) {
        return new Response(JSON.stringify({ error: "Order not found" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await supabase.from("hosting_orders").update({
        status: "paid", payment_id: paymentId, updated_at: new Date().toISOString(),
      }).eq("id", orderId);

      // Provision service
      await supabase.from("hosting_services").insert({
        user_id: order.user_id, order_id: order.id, plan_id: order.plan_id,
        plan_name: order.plan_name, domain: order.domain, status: "provisioning",
      });

      // Create subscription
      const periodEnd = new Date();
      if (order.billing_cycle === "annual") periodEnd.setFullYear(periodEnd.getFullYear() + 1);
      else periodEnd.setMonth(periodEnd.getMonth() + 1);

      await supabase.from("hosting_subscriptions").insert({
        user_id: order.user_id, order_id: order.id, plan_id: order.plan_id,
        plan_name: order.plan_name, billing_cycle: order.billing_cycle, status: "active",
        current_period_end: periodEnd.toISOString(), amount: order.total, currency: "INR",
      });

      // Create invoice
      const invoiceNumber = "INV-" + Date.now().toString(36).toUpperCase();
      await supabase.from("hosting_invoices").insert({
        user_id: order.user_id, order_id: order.id, invoice_number: invoiceNumber,
        amount: order.subtotal - order.discount_amount, tax_amount: order.tax_amount,
        total: order.total, currency: "INR", status: "paid", paid_at: new Date().toISOString(),
      });

      return new Response(JSON.stringify({ success: true, orderId, invoiceNumber }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark manual payment
    if (action === "mark-manual-payment") {
      const { data: order } = await supabase.from("hosting_orders").select("*").eq("id", orderId).maybeSingle();
      if (!order || order.user_id !== userData.user.id) {
        return new Response(JSON.stringify({ error: "Order not found" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await supabase.from("hosting_orders").update({
        status: "pending", payment_method: paymentMethod || "manual",
        notes: "Manual payment submitted, pending verification", updated_at: new Date().toISOString(),
      }).eq("id", orderId);

      return new Response(JSON.stringify({ success: true, message: "Payment recorded. Order will be activated after verification." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
