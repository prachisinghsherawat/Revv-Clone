import { Apple, Play, Smartphone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const points = [
  "Unlock the car from your phone",
  "Extend a booking mid-trip",
  "Track fuel, tolls and deposit refunds",
];

export default function AppDownload() {
  return (
    <section className="container-page py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
        <span className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-white/10 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-ink-950/20 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
              <Smartphone size={14} />
              Revv app
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              The whole rental fits in your pocket
            </h2>
            <ul className="mt-7 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-white/90">
                  <span className="size-1.5 shrink-0 rounded-full bg-white" />
                  <span className="text-sm font-semibold sm:text-base">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl bg-ink-950 px-5 py-3.5 text-white transition hover:-translate-y-0.5 hover:bg-black"
              >
                <Play size={22} className="fill-white" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wider opacity-70">
                    Get it on
                  </span>
                  <span className="block text-sm font-bold">Google Play</span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl bg-ink-950 px-5 py-3.5 text-white transition hover:-translate-y-0.5 hover:bg-black"
              >
                <Apple size={22} className="fill-white" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wider opacity-70">
                    Download on the
                  </span>
                  <span className="block text-sm font-bold">App Store</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.12} className="hidden lg:block">
            <img
              src="/images/rental.jpg"
              alt="Revv app on a phone"
              className="mx-auto w-full max-w-md rounded-3xl object-cover shadow-lift animate-float"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
