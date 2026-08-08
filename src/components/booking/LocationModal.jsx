import { useMemo, useState } from "react";
import { Check, LocateFixed, MapPin, Search, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { cities, nearestCity } from "@/data/content";
import { cn } from "@/lib/utils";

const popular = ["Delhi NCR", "Bengaluru", "Mumbai", "Hyderabad", "Pune", "Goa"];

const airports = {
  "Delhi NCR": "IGI Airport T3",
  Mumbai: "CSMI Airport T2",
  Bengaluru: "Kempegowda Airport",
  Hyderabad: "Rajiv Gandhi Airport",
  Chennai: "Chennai Airport",
  Pune: "Lohegaon Airport",
  Kolkata: "NSC Bose Airport",
  Jaipur: "Jaipur Airport",
  Chandigarh: "Chandigarh Airport",
  Goa: "Manohar Airport",
};

export default function LocationModal({ open, onClose, value, onSelect }) {
  const [query, setQuery] = useState("");
  const [locating, setLocating] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Your browser cannot share a location. Pick a city below.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { city, distanceKm } = nearestCity(coords.latitude, coords.longitude);
        setLocating(false);
        if (distanceKm > 250) {
          toast.error(`Nearest hub is ${city}, about ${distanceKm} km away.`);
          choose(city);
          return;
        }
        toast.success(`Found you near ${city}`);
        choose(city);
      },
      (error) => {
        setLocating(false);
        toast.error(
          error.code === error.PERMISSION_DENIED
            ? "Location permission denied. Pick a city below."
            : "Could not get your location. Pick a city below.",
        );
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return cities;
    return cities.filter(
      (name) =>
        name.toLowerCase().includes(term) ||
        (airports[name] ?? "").toLowerCase().includes(term),
    );
  }, [query]);

  const choose = (name) => {
    onSelect(name);
    setQuery("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Where do you need the car?"
      description="Pick a city and we will show cars available near you."
    >
      <div className="sticky top-0 z-10 border-b border-ink-100 bg-white p-5">
        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city or airport"
            aria-label="Search city or airport"
            className="field-input pl-11"
          />
        </div>

        <button
          type="button"
          onClick={detectLocation}
          disabled={locating}
          className="mt-3 flex w-full items-center gap-2.5 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-800 transition hover:bg-brand-100 disabled:cursor-progress disabled:opacity-70"
        >
          <LocateFixed size={16} className={cn(locating && "animate-spin")} />
          {locating ? "Finding you…" : "Use my current location"}
          <span className="ml-auto text-xs font-semibold text-brand-700">
            {locating ? "" : "Detect"}
          </span>
        </button>
      </div>

      <div className="p-5">
        {!query && (
          <>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-400">
              <TrendingUp size={13} />
              Popular right now
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popular.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => choose(name)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-bold transition",
                    name === value
                      ? "bg-ink-900 text-white"
                      : "bg-ink-50 text-ink-600 ring-1 ring-ink-200 hover:ring-ink-400",
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          </>
        )}

        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-ink-400">
          {query ? `${filtered.length} match${filtered.length === 1 ? "" : "es"}` : "All cities"}
        </p>

        {filtered.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-ink-50 px-4 py-8 text-center text-sm font-semibold text-ink-500">
            We are not in that city yet. Try another one.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-ink-100">
            {filtered.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => choose(name)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-3.5 text-left transition hover:bg-ink-50"
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full",
                      name === value ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500",
                    )}
                  >
                    <MapPin size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink-900">{name}</span>
                    {airports[name] && (
                      <span className="block truncate text-xs font-medium text-ink-400">
                        {airports[name]} · doorstep delivery available
                      </span>
                    )}
                  </span>
                  {name === value && <Check size={17} className="shrink-0 text-brand-700" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
