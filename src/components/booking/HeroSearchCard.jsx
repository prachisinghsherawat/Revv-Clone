import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import toast from "react-hot-toast";
import useBookingStore from "@/store/useBookingStore";
import DateRangePicker from "./DateRangePicker";
import LocationModal from "./LocationModal";
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
  const [picked, setPicked] = useState(false);

  const [form, setForm] = useState({
    city: store.city,
    startDate: store.startDate,
    endDate: store.endDate,
    startTime: store.startTime,
    endTime: store.endTime,
  });

  const update = (patch) =>
    setForm((current) => {
      const next = { ...current, ...patch };
      if (patch.startDate && next.endDate < patch.startDate) {
        next.endDate = addDays(patch.startDate, 1);
      }
      return next;
    });

  const chooseCity = (name) => {
    update({ city: name });
    setPicked(true);
    setCityOpen(false);
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

      <div className="relative mt-6">
        <button
          type="button"
          onClick={() => setCityOpen((open) => !open)}
          aria-expanded={cityOpen}
          aria-haspopup="dialog"
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

      </div>

      <LocationModal
        open={cityOpen}
        onClose={() => setCityOpen(false)}
        value={form.city}
        onSelect={chooseCity}
      />

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
