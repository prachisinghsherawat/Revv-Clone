import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Rating({ value = 0, size = 14, showValue = true, className }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={size}
            className={cn(
              index < Math.round(value)
                ? "fill-amber-400 text-amber-400"
                : "fill-ink-200 text-ink-200",
            )}
          />
        ))}
      </span>
      {showValue && <span className="text-xs font-bold text-ink-700">{value.toFixed(1)}</span>}
    </span>
  );
}
