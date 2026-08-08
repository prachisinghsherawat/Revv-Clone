import { cn } from "@/lib/utils";

const tones = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  dark: "bg-ink-900 text-white ring-ink-900",
  neutral: "bg-ink-100 text-ink-700 ring-ink-200",
  success: "bg-brand-50 text-brand-700 ring-brand-100",
  amber: "bg-brand-50 text-brand-700 ring-brand-100",
};

export default function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
