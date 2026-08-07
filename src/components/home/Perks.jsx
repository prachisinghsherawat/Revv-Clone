import { BadgeIndianRupee, Car, Clock, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { perks } from "@/data/content";

const iconMap = { ShieldCheck, Sparkles, Wrench, BadgeIndianRupee, Car, Clock };

export default function Perks() {
  return (
    <section className="bg-ink-950 py-16 text-white lg:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Revv"
          title="Everything bundled, nothing sprung on you"
          description="The things other rental companies charge extra for are already in the price you see."
          className="[&_h2]:text-white [&_p]:text-ink-400"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk, index) => {
            const Icon = iconMap[perk.icon] ?? Sparkles;
            return (
              <Reveal
                key={perk.title}
                delay={index * 0.06}
                className="group rounded-3xl border border-ink-800 bg-ink-900/60 p-7 transition-colors duration-300 hover:border-brand-500/50 hover:bg-ink-900"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-500/15 text-brand-400 transition group-hover:bg-brand-500 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{perk.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
