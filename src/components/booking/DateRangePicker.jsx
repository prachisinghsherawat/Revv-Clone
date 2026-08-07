import { useCallback, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock, MoveRight } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import useMediaQuery from "@/hooks/useMediaQuery";
import Button from "@/components/ui/Button";
import { addDays, cn, daysBetween, formatDateLong, parseISODate, toISODate, today } from "@/lib/utils";
import "react-day-picker/style.css";

const presets = [
  { label: "Tomorrow, 1 day", from: 1, nights: 1 },
  { label: "This weekend", weekend: true },
  { label: "A week", from: 1, nights: 7 },
  { label: "A fortnight", from: 1, nights: 15 },
  { label: "A month", from: 1, nights: 30 },
];

const times = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

const nextWeekend = () => {
  const date = parseISODate(today());
  const offset = (6 - date.getDay() + 7) % 7 || 7;
  const from = addDays(today(), offset);
  return { from, to: addDays(from, 2) };
};

function TimeField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2 rounded-xl bg-ink-50 px-3 py-2">
      <Clock size={15} className="shrink-0 text-ink-400" />
      <span className="text-xs font-bold text-ink-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={`${label} time`}
        className="ml-auto rounded-lg bg-white px-2 py-1 text-sm font-bold text-ink-900 outline-none"
      >
        {times.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </select>
    </label>
  );
}

export default function DateRangePicker({
  startDate,
  endDate,
  startTime,
  endTime,
  onChange,
  minNights = 1,
  variant = "popover",
  showPresets = true,
  showTimes = true,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const twoMonths = useMediaQuery("(min-width: 768px)");
  const inline = variant === "inline";

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(containerRef, close, open && !inline);

  const selected = {
    from: parseISODate(startDate),
    to: parseISODate(endDate),
  };

  const nights = daysBetween(startDate, endDate);

  const handleSelect = (range) => {
    if (!range?.from) return;
    const from = toISODate(range.from);
    const to = range.to ? toISODate(range.to) : addDays(from, minNights);
    onChange({
      startDate: from,
      endDate: to < addDays(from, minNights) ? addDays(from, minNights) : to,
    });
  };

  const applyPreset = (preset) => {
    if (preset.weekend) {
      const { from, to } = nextWeekend();
      onChange({ startDate: from, endDate: to });
      return;
    }
    const from = addDays(today(), preset.from);
    onChange({ startDate: from, endDate: addDays(from, preset.nights) });
  };

  const presetRow = showPresets && (
    <div className="flex flex-wrap gap-1.5 border-b border-ink-100 p-3">
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => applyPreset(preset)}
          className="rounded-lg bg-ink-50 px-3 py-1.5 text-xs font-bold text-ink-600 transition hover:bg-ink-900 hover:text-white"
        >
          {preset.label}
        </button>
      ))}
    </div>
  );

  const calendar = (
    <DayPicker
      mode="range"
      selected={selected}
      onSelect={handleSelect}
      numberOfMonths={inline ? 1 : twoMonths ? 2 : 1}
      startMonth={parseISODate(today())}
      disabled={{ before: parseISODate(today()) }}
      showOutsideDays={false}
      weekStartsOn={1}
      className="revv-calendar"
    />
  );

  const timeRow = showTimes && (
    <div className="grid gap-3 border-t border-ink-100 p-3 sm:grid-cols-2">
      <TimeField
        label="Pickup"
        value={startTime}
        onChange={(value) => onChange({ startTime: value })}
      />
      <TimeField
        label="Drop-off"
        value={endTime}
        onChange={(value) => onChange({ endTime: value })}
      />
    </div>
  );

  if (inline) {
    return (
      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
        {presetRow}
        <div className="flex justify-center p-2">{calendar}</div>
        {timeRow}
        <p className="border-t border-ink-100 bg-ink-50/60 px-4 py-2.5 text-center text-sm font-bold text-ink-700">
          {formatDateLong(startDate)} → {formatDateLong(endDate)} · {nights} day
          {nights === 1 ? "" : "s"}
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left transition",
          open
            ? "border-brand-500 ring-4 ring-brand-500/10"
            : "border-ink-200 hover:border-ink-400",
        )}
      >
        <CalendarDays size={18} className="shrink-0 text-brand-500" />
        <span className="flex flex-1 items-center gap-2 overflow-hidden">
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">
              Pickup
            </span>
            <span className="block truncate text-sm font-bold text-ink-900">
              {formatDateLong(startDate)}
              <span className="ml-1.5 font-semibold text-ink-500">{startTime}</span>
            </span>
          </span>
          <MoveRight size={15} className="shrink-0 text-ink-300" />
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">
              Drop-off
            </span>
            <span className="block truncate text-sm font-bold text-ink-900">
              {formatDateLong(endDate)}
              <span className="ml-1.5 font-semibold text-ink-500">{endTime}</span>
            </span>
          </span>
        </span>
        <span className="hidden shrink-0 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 sm:block">
          {nights}d
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Choose your rental dates"
            className="absolute left-0 right-0 z-40 mt-2 origin-top overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-lift sm:right-auto sm:min-w-max"
          >
            {presetRow}
            <div className="max-h-[52vh] overflow-y-auto p-3 sm:max-h-none">{calendar}</div>
            {timeRow}
            <div className="flex items-center justify-between gap-4 border-t border-ink-100 bg-ink-50/60 px-4 py-3">
              <p className="text-sm font-bold text-ink-700">
                {nights} day{nights === 1 ? "" : "s"} selected
              </p>
              <Button type="button" size="sm" onClick={close}>
                Done
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
