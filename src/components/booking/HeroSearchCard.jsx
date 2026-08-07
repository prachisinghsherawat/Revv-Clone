import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Search } from "lucide-react";
import toast from "react-hot-toast";
import useBookingStore from "@/store/useBookingStore";
import useClickOutside from "@/hooks/useClickOutside";
import { cities } from "@/data/content";
import DateRangePicker from "./DateRangePicker";
import Button from "@/components/ui/Button";
import { addDays, cn, daysBetween } from "@/lib/utils";

const modes = [
  { id: "rental", label: "Rental", hint: "For hours & days", heading: "Rentals" },
  {
    id: "subscription",
    label: "Subscriptions",
    hint: "For more than 7 days",
    heading: "Subscriptions",
  },
];

export default function HeroSearchCard() {
  const navigate = useNavigate();
  const store = useBookingStore();
  const [mode, setMode] = useState("rental");
  const [cityOpen, setCityOpen] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [picked, setPicked] = useState(false);
  const cityRef = useRef(null);

  const [form, setForm] = useState({
    city: store.city,
    startDate: store.startDate,
    endDate: store.endDate,
    startTime: store.startTime,
    endTime: store.endTime,
  });

  useClickOutside(cityRef, () => setCityOpen(false), cityOpen);

  const update = (patch) =>
    setForm((current) => {
      const next = { ...current, ...patch };
      if (patch.startDate && next.endDate < patch.startDate) {
        next.endDate = addDays(patch.startDate, 1);
      }
      return next;
    });

  const filtered = useMemo(() => {
    const term = cityQuery.trim().toLowerCase();
    return term ? cities.filter((name) => name.toLowerCase().includes(term)) : cities;
  }, [cityQuery]);

  const chooseCity = (name) => {
    update({ city: name });
    setPicked(true);
    setCityOpen(false);
    setCityQuery("");
  };

  const changeMode = (id) => {
    setMode(id);
    if (id === "subscription" && daysBetween(form.startDate, form.endDate) < 7) {
      update({ endDate: addDays(form.startDate, 7) });
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (!picked) {
      setCityOpen(true);
      toast("Choose a pickup location to continue");
      return;
    }
    if (mode === "subscription" && daysBetween(form.startDate, form.endDate) < 7) {
      toast.error("Subscriptions start at 7 days. Extend your drop-off date.");
      return;
    }
    store.setSearch(form);
    toast.success(`${daysBetween(form.startDate, form.endDate)} day trip in ${form.city}`);
    navigate("/cars");
  };

  const active = modes.find((item) => item.id === mode);

  return (
    <form
      onSubmit={submit}
      className="w-full rounded-3xl bg-white p-5 shadow-lift sm:p-7"
      aria-label="Find a car"
    >
      <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-teal-500">
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => changeMode(item.id)}
            aria-pressed={mode === item.id}
            className={cn(
              "relative px-3 py-3 text-center transition-colors duration-200",
              mode === item.id ? "bg-white" : "text-white hover:bg-teal-400",
            )}
          >
            <span
              className={cn(
                "block text-sm font-extrabold sm:text-base",
                mode === item.id ? "text-ink-950" : "text-white",
              )}
            >
              {item.label}
            </span>
            <span
              className={cn(
                "block text-[11px] font-medium",
                mode === item.id ? "text-ink-500" : "text-white/85",
              )}
            >
              {item.hint}
            </span>
            {mode === item.id && (
              <motion.span
                layoutId="hero-tab-pointer"
                className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-white"
              />
            )}
          </button>
        ))}
      </div>

      <div className="pt-8 text-center">
        <p className="font-display text-2xl font-extrabold tracking-tight text-ink-950">
          {active.heading}
        </p>
        <p className="mt-1.5 text-sm font-medium text-ink-500">
          Largest company-owned fleet in India
        </p>
      </div>

      <div ref={cityRef} className="relative mt-6">
        <button
          type="button"
          onClick={() => setCityOpen((open) => !open)}
          aria-expanded={cityOpen}
          aria-haspopup="listbox"
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left shadow-card transition",
            cityOpen ? "border-teal-500 ring-4 ring-teal-500/10" : "border-ink-100 hover:border-ink-300",
          )}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-teal-500 text-white">
            <MapPin size={17} />
          </span>
          <span className="min-w-0 flex-1">
            {picked ? (
              <>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">
                  Pickup location
                </span>
                <span className="block truncate text-sm font-bold text-ink-900">{form.city}</span>
              </>
            ) : (
              <span className="block truncate text-sm font-bold text-ink-400">
                Select location to search
              </span>
            )}
          </span>
          <ArrowRight size={18} className="shrink-0 text-brand-500" />
        </button>

        <AnimatePresence>
          {cityOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 z-40 mt-2 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-lift"
            >
              <div className="border-b border-ink-100 p-2">
                <input
                  autoFocus
                  value={cityQuery}
                  onChange={(event) => setCityQuery(event.target.value)}
                  placeholder="Search city"
                  aria-label="Search city"
                  className="w-full rounded-lg bg-ink-50 px-3 py-2 text-sm font-semibold text-ink-900 outline-none placeholder:text-ink-400"
                />
              </div>
              <ul role="listbox" className="max-h-56 overflow-y-auto p-1.5">
                {filtered.length === 0 && (
                  <li className="px-3 py-4 text-center text-sm font-semibold text-ink-400">
                    No city matches that
                  </li>
                )}
                {filtered.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={picked && name === form.city}
                      onClick={() => chooseCity(name)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition",
                        picked && name === form.city
                          ? "bg-teal-50 text-teal-800"
                          : "text-ink-600 hover:bg-ink-100",
                      )}
                    >
                      {name}
                      {picked && name === form.city && <Check size={15} />}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {picked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <DateRangePicker
                variant="inline"
                startDate={form.startDate}
                endDate={form.endDate}
                startTime={form.startTime}
                endTime={form.endTime}
                onChange={update}
                minNights={mode === "subscription" ? 7 : 1}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button type="submit" size="lg" className="mt-5 w-full">
        <Search size={17} />
        {picked ? "Search cars" : "Select location to search"}
      </Button>
    </form>
  );
}
