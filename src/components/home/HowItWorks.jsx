import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { steps } from "@/data/content";

export default function HowItWorks() {
  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps between you and the keys"
        align="center"
      />

      <div className="relative mt-14">
        <div className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent lg:block" />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.1} className="relative text-center">
              <span className="relative z-10 mx-auto grid size-14 place-items-center rounded-2xl bg-brand-500 font-display text-xl font-extrabold text-white shadow-glow">
                {step.id}
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
