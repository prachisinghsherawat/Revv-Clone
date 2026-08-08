import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Button from "@/components/ui/Button";
import Perks from "@/components/home/Perks";
import { journey, stats } from "@/data/content";

const values = [
  {
    title: "Own the fleet, own the promise",
    body: "Every car is bought and maintained by us. No aggregator roulette, no surprise substitutions at pickup.",
  },
  {
    title: "Price it once, price it honestly",
    body: "Insurance, taxes and assistance are in the number you see. The only things you add are fuel and tolls.",
  },
  {
    title: "Make the paperwork disappear",
    body: "Documents get verified once. After that, pickup is an unlock and a walkaround, nothing more.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        title="About Revv"
        description="We started with 50 cars in Gurugram and a simple idea: renting a car should feel like unlocking your own."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-px overflow-hidden rounded-3xl bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.07} className="bg-white px-6 py-8 text-center">
              <p className="font-display text-4xl font-extrabold text-ink-950">
                {stat.prefix}
                <Counter value={stat.value} decimals={stat.decimals ?? 0} />
                <span className="text-2xl text-brand-500">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-500">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-16 lg:pb-24">
        <SectionHeading eyebrow="What we believe" title="Three rules we do not bend" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal
              key={value.title}
              delay={index * 0.08}
              className="card-surface p-7 transition hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-display text-5xl font-extrabold text-brand-100">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink-950">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="journey" className="bg-ink-50/70 py-16 lg:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Our journey" title="Ten years, one road" align="center" />

          <ol className="relative mx-auto mt-14 max-w-3xl">
            <span className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-ink-200 sm:left-1/2" />
            {journey.map((item, index) => (
              <Reveal
                key={item.year}
                delay={index * 0.06}
                direction={index % 2 === 0 ? "right" : "left"}
                className="relative mb-10 pl-12 last:mb-0 sm:w-1/2 sm:pl-0 sm:even:ml-auto sm:even:pl-12 sm:odd:pr-12 sm:odd:text-right"
              >
                <span className="absolute left-2.5 top-2 size-3 rounded-full bg-brand-500 ring-4 ring-white sm:left-auto sm:-right-1.5 sm:even:-left-1.5" />
                <p className="font-display text-2xl font-extrabold text-brand-700">{item.year}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Perks />

      <section id="careers" className="container-page py-16 lg:py-24">
        <div className="card-surface flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-12">
          <h2 className="max-w-2xl text-3xl font-extrabold text-ink-950 sm:text-4xl">
            Want to help put four thousand more cars on the road?
          </h2>
          <p className="max-w-xl text-base text-ink-500">
            We hire engineers, fleet managers and city leads across India. Tell us what you would
            fix first.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" to="/cars">
              Browse the fleet
            </Button>
            <Button variant="outline" size="lg" to="/faq">
              Read the FAQs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
