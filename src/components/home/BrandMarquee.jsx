import { brands } from "@/data/cars";

const items = [...brands, "Kia", "Tata", "Renault", "MG", "Skoda", "Volkswagen"];

export default function BrandMarquee() {
  return (
    <section className="border-y border-ink-100 bg-white py-8">
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-14">
          {[...items, ...items].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="font-display text-xl font-bold whitespace-nowrap text-ink-300 transition-colors hover:text-ink-600 sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
