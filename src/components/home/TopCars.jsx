import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CarCard from "@/components/cars/CarCard";
import { cars, segments } from "@/data/cars";
import { cn } from "@/lib/utils";

const filters = ["All", ...segments];

export default function TopCars() {
  const [active, setActive] = useState("All");

  const visible = useMemo(() => {
    const pool = active === "All" ? cars : cars.filter((car) => car.segment === active);
    return [...pool].sort((a, b) => b.trips - a.trips).slice(0, 6);
  }, [active]);

  return (
    <section className="bg-ink-50/70 py-16 lg:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Top selling"
          title="The cars people keep coming back to"
          description="Ranked by trips completed in the last 90 days across all our cities."
          action={
            <Button variant="outline" to="/cars">
              Browse all {cars.length} cars
              <ArrowRight size={16} />
            </Button>
          }
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold transition",
                active === filter
                  ? "bg-ink-900 text-white shadow-card"
                  : "bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-ink-400",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
