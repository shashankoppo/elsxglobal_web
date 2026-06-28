'use client';

import { ArrowRight, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';

export function FinalCTA() {
  const { openLead } = useLead();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-card/30">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
          The Gap Between Where You Are
          <br />
          and Where You Could Be
          <br />
          <span className="text-gradient">Is a Strategy Conversation.</span>
        </h2>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join 200+ organizations that chose to build intelligent, scalable,
          future-ready enterprises.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={() => openLead('consultation')}
            className="h-12 px-8 text-base btn-premium"
          >
            Book Your Strategy Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => openLead('proposal')}
              className="h-11 px-6 text-sm"
            >
              <FileText className="mr-2 h-4 w-4" />
              Request a Formal Proposal
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-6 text-sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Capability Deck
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
