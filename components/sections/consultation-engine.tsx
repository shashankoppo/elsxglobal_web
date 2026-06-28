'use client';

import { useState } from 'react';
import { Calendar, Clock, CheckCircle2, ArrowRight, FileText, Download, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLead } from '@/components/site/lead-context';
import { SectionHeading } from '@/components/site/section-heading';
import { cn } from '@/lib/utils';

const EXPECTATIONS = [
  'Business challenge assessment',
  'Current-state technology audit',
  'Transformation opportunity mapping',
  'Recommended starting point',
  'Investment framework overview',
  'Clear next steps (no pressure)',
];

const SLOTS = [
  { day: 'Mon', date: 'Jun 30', times: ['10:00 AM', '2:00 PM', '4:30 PM'] },
  { day: 'Tue', date: 'Jul 1', times: ['11:00 AM', '3:00 PM'] },
  { day: 'Wed', date: 'Jul 2', times: ['9:30 AM', '1:00 PM', '5:00 PM'] },
  { day: 'Thu', date: 'Jul 3', times: ['10:30 AM', '2:30 PM'] },
];

export function ConsultationEngine() {
  const { openLead } = useLead();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Book a Consultation"
          title={
            <>
              Ready To Build the Next Version
              <br />
              <span className="text-gradient">of Your Organization?</span>
            </>
          }
          description="A 45-minute strategy session. No pitch. No fluff. Just a structured conversation about your challenges and what transformation could look like for you."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          {/* What to expect */}
          <div>
            <h3 className="text-lg font-semibold mb-5">What to expect</h3>
            <div className="space-y-3">
              {EXPECTATIONS.map((e) => (
                <div
                  key={e}
                  className="flex items-center gap-3 glass-panel rounded-lg px-4 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <span className="text-sm">{e}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 glass-strong rounded-lg p-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-accent shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Limited availability:</span>{' '}
                Strategy sessions typically booked 5–7 business days out. Next
                available: <span className="text-primary font-medium">Jun 30</span>.
              </p>
            </div>
          </div>

          {/* Time selection */}
          <div className="glass-strong rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="text-base font-semibold">Select a time</h3>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-5">
              {SLOTS.map((s, i) => (
                <button
                  key={s.date}
                  onClick={() => {
                    setSelectedDay(i);
                    setSelectedSlot(null);
                  }}
                  className={cn(
                    'rounded-lg border px-2 py-3 text-center transition-colors',
                    selectedDay === i
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card/50 hover:border-primary/40'
                  )}
                >
                  <p className="text-xs text-muted-foreground">{s.day}</p>
                  <p className="text-sm font-semibold mt-0.5">{s.date}</p>
                </button>
              ))}
            </div>

            <div className="space-y-2 mb-5">
              {SLOTS[selectedDay].times.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedSlot(t)}
                  className={cn(
                    'w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between',
                    selectedSlot === t
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card/50 hover:border-primary/40'
                  )}
                >
                  <span>{t}</span>
                  {selectedSlot === t && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={() => openLead('consultation')}
              disabled={!selectedSlot}
              className="w-full h-11 btn-premium"
            >
              {selectedSlot ? (
                <>
                  Confirm {SLOTS[selectedDay].day}, {selectedSlot}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Select a time slot'
              )}
            </Button>

            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Prefer another way?</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openLead('proposal')}
                  className="text-xs h-9"
                >
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  Request Proposal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-9"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Capability Deck
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
