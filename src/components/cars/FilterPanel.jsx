import { RotateCcw } from "lucide-react";
import { brands, fuels, priceBounds, segments, transmissions } from "@/data/cars";
import { cn, formatINR } from "@/lib/utils";

function CheckGroup({ title, options, selected, onToggle }) {
  return (
    <fieldset className="border-t border-ink-100 py-5 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-sm font-bold text-ink-900">{title}</legend>
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
                "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                active
                  ? "bg-brand-500 text-white"
                  : "bg-ink-50 text-ink-600 ring-1 ring-ink-200 hover:ring-ink-400",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function FilterPanel({ filters, onToggle, onChange, onReset, resultCount }) {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between pb-5">
        <h2 className="font-display text-lg font-bold text-ink-950">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 transition hover:text-brand-700"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      <CheckGroup
        title="Body type"
        options={segments}
        selected={filters.segment}
        onToggle={(value) => onToggle("segment", value)}
      />
      <CheckGroup
        title="Brand"
        options={brands}
        selected={filters.brand}
        onToggle={(value) => onToggle("brand", value)}
      />
      <CheckGroup
        title="Transmission"
        options={transmissions}
        selected={filters.transmission}
        onToggle={(value) => onToggle("transmission", value)}
      />
      <CheckGroup
        title="Fuel"
        options={fuels}
        selected={filters.fuel}
        onToggle={(value) => onToggle("fuel", value)}
      />
      <CheckGroup
        title="Seats"
        options={["4", "5", "7"]}
        selected={filters.seats}
        onToggle={(value) => onToggle("seats", value)}
      />

      <fieldset className="border-t border-ink-100 pt-5">
        <legend className="mb-3 text-sm font-bold text-ink-900">Max price per day</legend>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={50}
          value={filters.maxPrice}
          onChange={(event) => onChange({ maxPrice: Number(event.target.value) })}
          className="w-full accent-brand-500"
          aria-label="Maximum price per day"
        />
        <div className="mt-2 flex justify-between text-xs font-bold text-ink-500">
          <span>{formatINR(priceBounds.min)}</span>
          <span className="text-brand-600">Up to {formatINR(filters.maxPrice)}</span>
        </div>
      </fieldset>

      <p className="mt-6 rounded-xl bg-ink-50 px-4 py-3 text-center text-sm font-bold text-ink-700">
        {resultCount} car{resultCount === 1 ? "" : "s"} available
      </p>
    </div>
  );
}
