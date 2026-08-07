import { SearchX } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  title = "Nothing to show here",
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 bg-ink-50/60 px-6 py-20 text-center">
      <div className="grid size-16 place-items-center rounded-2xl bg-white shadow-card">
        <SearchX className="text-ink-400" size={28} />
      </div>
      <h3 className="mt-6 text-xl font-bold text-ink-900">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-ink-500">{description}</p>}
      {actionLabel && (
        <Button variant="outline" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
