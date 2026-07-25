import { Metadata } from "next";
import { faqs } from "@/data/clinic";
import { SectionShell } from "@/components/SectionShell";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Button } from "@/components/Button";
import { AnimatedHero } from "@/components/AnimatedHero";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Find answers to common questions about appointments, treatments and care at DBS Aesthetics Clinic & Salon.",
};

export default function FaqsPage() {
  return (
    <div>  
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,172,106,0.18),transparent_50%)]" />
      
      <section className="mx-auto max-w-7xl px-4 pt-[120px] pb-24 sm:px-6 md:pt-[140px] lg:px-8 lg:pt-[160px]">
        <AnimatedHero>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] font-semibold font-serif text-[#c9ac6a]">FAQs</p>
            <h1 className="mt-4 text-4xl font-semibold font-serif text-[#f7f2e9] sm:text-5xl">Answers to the questions clients ask most often.</h1>
            <p className="mt-6 text-lg leading-8 text-[#f7f2e9]/75">From consultation guidance to booking timelines, we make the process feel clear and effortless.</p>
          </div>
        </AnimatedHero>
      </section>

      <SectionShell eyebrow="Common questions" title="Helpful answers before your visit" description="A detailed overview of what to expect at DBS.">
        <FaqAccordion items={faqs} />
      </SectionShell>  
    </div>
  );
}

