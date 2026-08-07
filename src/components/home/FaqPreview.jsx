import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/data/content";

export default function FaqPreview() {
  return (
    <section className="bg-ink-50/70 py-16 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="FAQs"
            title="Questions we get asked most"
            description="Still stuck? Support answers in under a minute, day or night."
          />
          <Reveal delay={0.1} className="mt-8">
            <Button variant="dark" to="/faq">
              Read all {faqs.length} answers
              <ArrowRight size={16} />
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <Accordion items={faqs.slice(0, 6)} />
        </Reveal>
      </div>
    </section>
  );
}
