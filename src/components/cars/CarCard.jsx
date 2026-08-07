import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Fuel, Gauge, Settings2, Users } from "lucide-react";
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group card-surface flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-200 hover:shadow-lift"
    >
      <Link to={`/cars/${car.id}`} className="relative block overflow-hidden bg-ink-100">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5">
          <div className="flex flex-wrap gap-1.5">
            {car.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} tone="dark">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-ink-800 backdrop-blur">
            {car.year}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight text-ink-950">
              <Link to={`/cars/${car.id}`} className="transition hover:text-brand-600">
                {car.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-400">
              {car.segment} · {formatNumber(car.trips)} trips
            </p>
          </div>
          <Rating value={car.rating} size={12} />
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-2">
          {specs.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-1.5 rounded-lg bg-ink-50 px-2.5 py-1.5 text-xs font-semibold text-ink-600"
            >
              <Icon size={13} className="text-ink-400" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-ink-100 pt-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">Starts at</p>
            <p className="font-display text-2xl font-extrabold text-ink-950">
              {formatINR(car.priceFrom)}
              <span className="text-sm font-semibold text-ink-400">/day</span>
            </p>
          </div>
          <Button to={`/cars/${car.id}`} size="sm">
            Book
            <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
