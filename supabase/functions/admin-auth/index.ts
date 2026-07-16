import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

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

    const body = await req.json();
    const { action, email, password, name } = body;

    // Login
    if (action === "login") {
      if (!email || !password) {
        return new Response(JSON.stringify({ error: "Email and password required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: admin, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email.toLowerCase())
        .eq("is_active", true)
        .maybeSingle();

      if (error || !admin) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const hashedPassword = await hashPassword(password);
      if (admin.password_hash !== hashedPassword) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const token = crypto.randomUUID() + "-" + Date.now();

      return new Response(JSON.stringify({
        success: true,
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.full_name || "Administrator",
          role: admin.role,
        },
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Setup initial admin (only works if no admin exists yet)
    if (action === "setup") {
      const { count } = await supabase
        .from("admin_users")
        .select("*", { count: "exact", head: true });

      if (count && count > 0) {
        return new Response(JSON.stringify({ error: "Admin already exists. Use login instead." }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!email || !password || password.length < 8) {
        return new Response(JSON.stringify({ error: "Email and password (min 8 chars) required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const hashedPassword = await hashPassword(password);
      const { data: newAdmin, error: insertError } = await supabase
        .from("admin_users")
        .insert({
          email: email.toLowerCase(),
          password_hash: hashedPassword,
          full_name: name || "Administrator",
          role: "superadmin",
          is_active: true,
        })
        .select()
        .single();

      if (insertError) {
        return new Response(JSON.stringify({ error: "Failed to create admin: " + insertError.message }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const token = crypto.randomUUID() + "-" + Date.now();

      return new Response(JSON.stringify({
        success: true,
        token,
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.full_name,
          role: newAdmin.role,
        },
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Verify token (called by admin pages to check session)
    if (action === "verify") {
      const { token } = body;
      if (!token) {
        return new Response(JSON.stringify({ valid: false }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Token format: uuid-timestamp, check it's not too old (24 hours)
      const parts = token.split("-");
      const timestamp = parseInt(parts[parts.length - 1]);
      const ageHours = (Date.now() - timestamp) / (1000 * 60 * 60);
      if (isNaN(timestamp) || ageHours > 24) {
        return new Response(JSON.stringify({ valid: false, error: "Token expired" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ valid: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get dashboard stats
    if (action === "stats") {
      const [ordersRes, servicesRes, invoicesRes, ticketsRes, plansRes, addonsRes] = await Promise.all([
        supabase.from("hosting_orders").select("total, status, created_at", { count: "exact" }),
        supabase.from("hosting_services").select("status", { count: "exact" }),
        supabase.from("hosting_invoices").select("total, status", { count: "exact" }),
        supabase.from("support_tickets").select("status", { count: "exact" }),
        supabase.from("hosting_plans").select("id, is_active", { count: "exact" }),
        supabase.from("hosting_addons").select("id, is_active", { count: "exact" }),
      ]);

      const orders = ordersRes.data || [];
      const totalRevenue = orders
        .filter((o: Record<string, unknown>) => o.status === "paid")
        .reduce((sum: number, o: Record<string, unknown>) => sum + (o.total as number), 0);
      const pendingOrders = orders.filter((o: Record<string, unknown>) => o.status === "pending").length;
      const activeServices = (servicesRes.data || []).filter((s: Record<string, unknown>) => s.status === "active").length;
      const openTickets = (ticketsRes.data || []).filter((t: Record<string, unknown>) => t.status === "open" || t.status === "pending").length;
      const unpaidInvoices = (invoicesRes.data || []).filter((i: Record<string, unknown>) => i.status === "sent" || i.status === "overdue").length;

      return new Response(JSON.stringify({
        totalOrders: ordersRes.count || 0,
        totalRevenue,
        pendingOrders,
        activeServices,
        totalServices: servicesRes.count || 0,
        openTickets,
        totalTickets: ticketsRes.count || 0,
        unpaidInvoices,
        totalInvoices: invoicesRes.count || 0,
        activePlans: (plansRes.data || []).filter((p: Record<string, unknown>) => p.is_active).length,
        totalPlans: plansRes.count || 0,
        activeAddons: (addonsRes.data || []).filter((a: Record<string, unknown>) => a.is_active).length,
        totalAddons: addonsRes.count || 0,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
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
