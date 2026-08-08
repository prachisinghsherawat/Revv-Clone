import { useState } from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { brands, fuels, priceBounds, segments, transmissions } from "@/data/cars";
import { cn, formatINR } from "@/lib/utils";

function Section({ title, count, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-ink-100 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-ink-900">
          {title}
          {count > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-ink-900 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={cn("shrink-0 text-ink-400 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chips({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            aria-pressed={active}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-semibold transition",
              active
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-200 bg-white text-ink-600 hover:border-ink-400 hover:text-ink-900",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function FilterPanel({ filters, onToggle, onChange, onReset, resultCount }) {
  const activeCount =
    filters.segment.length +
    filters.brand.length +
    filters.transmission.length +
    filters.fuel.length +
    filters.seats.length +
    (filters.maxPrice < priceBounds.max ? 1 : 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink-950">
          <SlidersHorizontal size={16} className="text-ink-400" />
          Filters
        </h2>
        <button
          type="button"
          onClick={onReset}
          disabled={activeCount === 0}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 transition hover:text-ink-900 disabled:opacity-40 disabled:hover:text-ink-500"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      <div className="px-5">
        <Section title="Body type" count={filters.segment.length}>
          <Chips
            options={segments}
            selected={filters.segment}
            onToggle={(value) => onToggle("segment", value)}
          />
        </Section>

        <Section title="Brand" count={filters.brand.length}>
          <Chips
            options={brands}
            selected={filters.brand}
            onToggle={(value) => onToggle("brand", value)}
          />
        </Section>

        <Section title="Transmission" count={filters.transmission.length}>
          <Chips
            options={transmissions}
            selected={filters.transmission}
            onToggle={(value) => onToggle("transmission", value)}
          />
        </Section>

        <Section title="Fuel" count={filters.fuel.length}>
          <Chips
            options={fuels}
            selected={filters.fuel}
            onToggle={(value) => onToggle("fuel", value)}
          />
        </Section>

        <Section title="Seats" count={filters.seats.length}>
          <Chips
            options={["4", "5", "7"]}
            selected={filters.seats}
            onToggle={(value) => onToggle("seats", value)}
          />
        </Section>

        <Section title="Price per day" count={filters.maxPrice < priceBounds.max ? 1 : 0}>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-ink-500">Up to</span>
            <span className="font-display text-lg font-extrabold text-ink-950">
              {formatINR(filters.maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={50}
            value={filters.maxPrice}
            onChange={(event) => onChange({ maxPrice: Number(event.target.value) })}
            className="mt-2 w-full accent-ink-900"
            aria-label="Maximum price per day"
          />
          <div className="mt-1 flex justify-between text-[11px] font-semibold text-ink-400">
            <span>{formatINR(priceBounds.min)}</span>
            <span>{formatINR(priceBounds.max)}</span>
          </div>
        </Section>
      </div>

      <p className="border-t border-ink-100 bg-ink-50 px-5 py-3.5 text-center text-sm font-bold text-ink-700">
        {resultCount} car{resultCount === 1 ? "" : "s"} available
      </p>
    </div>
  );
}
