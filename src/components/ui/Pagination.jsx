import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pagesFor = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("start-gap");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < total - 1) pages.push("end-gap");
  pages.push(total);

  return pages;
};

export default function Pagination({ page, totalPages, onChange, className }) {
  if (totalPages <= 1) return null;

  const go = (next) => onChange(Math.min(totalPages, Math.max(1, next)));

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="grid size-10 place-items-center rounded-lg border border-ink-200 text-ink-700 transition hover:border-ink-900 hover:bg-ink-900 hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft size={17} />
      </button>

      {pagesFor(page, totalPages).map((item) =>
        typeof item === "string" ? (
          <span key={item} className="px-1 text-sm font-bold text-ink-400">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              "h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition",
              item === page
                ? "bg-ink-950 text-white"
                : "border border-ink-200 text-ink-700 hover:border-ink-900 hover:bg-ink-50",
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="grid size-10 place-items-center rounded-lg border border-ink-200 text-ink-700 transition hover:border-ink-900 hover:bg-ink-900 hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight size={17} />
      </button>
    </nav>
  );
}
