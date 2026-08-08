import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Fuel, Gauge, Settings2, Users } from "lucide-react";
import CarStage from "./CarStage";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import Button from "@/components/ui/Button";
import { formatINR, formatNumber } from "@/lib/utils";

export default function CarCard({ car, index = 0 }) {
  const specs = [
    { icon: Users, label: `${car.seats} seats` },
    { icon: Settings2, label: car.transmission },
    { icon: Fuel, label: car.fuel },
    { icon: Gauge, label: `${car.mileage} km/l` },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink-300 hover:shadow-lift"
    >
      <Link
        to={`/cars/${car.id}`}
        className="relative block shrink-0"
        aria-label={`View ${car.name}`}
      >
        <CarStage
          car={car}
          className="aspect-16/10 w-full"
          modelClassName="transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {car.tags.slice(0, 1).map((tag) => (
              <Badge key={tag} tone="dark">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="shrink-0 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-ink-700 shadow-card">
            {car.year}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 font-display text-base font-bold leading-snug text-ink-950">
            <Link to={`/cars/${car.id}`} className="line-clamp-1 transition hover:text-brand-700">
              {car.name}
            </Link>
          </h3>
          <Rating value={car.rating} size={12} className="shrink-0" />
        </div>

        <p className="mt-1 truncate text-xs font-semibold uppercase tracking-wide text-ink-400">
          {car.segment} · {formatNumber(car.trips)} trips
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-2">
          {specs.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex h-8 items-center gap-1.5 rounded-lg bg-ink-50 px-2.5 text-xs font-semibold text-ink-600"
            >
              <Icon size={13} className="shrink-0 text-ink-400" />
              <span className="truncate">{label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink-100 pt-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">Starts at</p>
            <p className="truncate font-display text-xl font-extrabold text-ink-950">
              {formatINR(car.priceFrom)}
              <span className="text-xs font-semibold text-ink-400">/day</span>
            </p>
          </div>
          <Button to={`/cars/${car.id}`} size="sm" className="shrink-0">
            Book
            <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
