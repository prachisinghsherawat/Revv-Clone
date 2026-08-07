import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { stats } from "@/data/content";

export default function Stats() {
  return (
    <section className="container-page py-16 lg:py-20">
      <div className="grid gap-px overflow-hidden rounded-3xl bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.08}
            className="bg-white px-6 py-8 text-center sm:px-8"
          >
            <p className="font-display text-4xl font-extrabold text-ink-950 lg:text-5xl">
              {stat.prefix}
              <Counter value={stat.value} decimals={stat.decimals ?? 0} />
              <span className="text-2xl text-brand-500">{stat.suffix}</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-ink-500">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
