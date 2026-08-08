import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Search } from "lucide-react";
import toast from "react-hot-toast";
import useBookingStore from "@/store/useBookingStore";
import { cities } from "@/data/content";
import Button from "@/components/ui/Button";
import DateRangePicker from "./DateRangePicker";
import { addDays, cn, daysBetween } from "@/lib/utils";

const modes = [
  { id: "rental", label: "Rental", hint: "For hours & days" },
  { id: "subscription", label: "Subscription", hint: "For 7+ days" },
];

export default function SearchWidget({ variant = "hero", onSearch }) {
  const navigate = useNavigate();
  const store = useBookingStore();
  const [mode, setMode] = useState("rental");
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

  const changeMode = (id) => {
    setMode(id);
    if (id === "subscription" && daysBetween(form.startDate, form.endDate) < 7) {
      update({ endDate: addDays(form.startDate, 7) });
    }
  };

  const submit = (event) => {
    event.preventDefault();

    if (!form.startDate || !form.endDate) {
      toast.error("Pick both a pickup and a drop-off date");
      return;
    }
    if (form.endDate < form.startDate) {
      toast.error("The drop-off date cannot be before pickup");
      return;
    }
    if (mode === "subscription" && daysBetween(form.startDate, form.endDate) < 7) {
      toast.error("Subscriptions start at 7 days. Extend your drop-off date.");
      return;
    }

    store.setSearch(form);
    toast.success(`${daysBetween(form.startDate, form.endDate)} day trip in ${form.city}`);
    if (onSearch) onSearch(form);
    else navigate("/cars");
  };

  const compact = variant === "compact";

  return (
    <form
      onSubmit={submit}
      className={cn(
        "w-full rounded-3xl bg-white p-4 sm:p-5",
        compact ? "border border-ink-100 shadow-card" : "shadow-lift",
      )}
    >
      <div className="mb-4 flex gap-2 rounded-2xl bg-ink-100 p-1.5">
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => changeMode(item.id)}
            className={cn(
              "flex-1 rounded-xl px-3 py-2.5 text-left transition",
              mode === item.id ? "bg-white shadow-card" : "hover:bg-white/60",
            )}
          >
            <span
              className={cn(
                "block text-sm font-bold",
                mode === item.id ? "text-brand-700" : "text-ink-700",
              )}
            >
              {item.label}
            </span>
            <span className="block text-[11px] font-medium text-ink-500">{item.hint}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        <div>
          <label htmlFor="city" className="field-label">
            <MapPin size={12} className="mr-1 inline" />
            Pickup city
          </label>
          <select
            id="city"
            value={form.city}
            onChange={(event) => update({ city: event.target.value })}
            className="field-input"
          >
            {cities.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="field-label">
            <CalendarDays size={12} className="mr-1 inline" />
            Trip dates
          </span>
          <DateRangePicker
            startDate={form.startDate}
            endDate={form.endDate}
            startTime={form.startTime}
            endTime={form.endTime}
            onChange={update}
            minNights={mode === "subscription" ? 7 : 1}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold text-ink-500">
          {daysBetween(form.startDate, form.endDate)} day
          {daysBetween(form.startDate, form.endDate) > 1 ? "s" : ""} · free cancellation up to 24h
        </p>
        <Button type="submit" size="lg" className="shrink-0">
          <Search size={17} />
          Search cars
        </Button>
      </div>
    </form>
  );
}
