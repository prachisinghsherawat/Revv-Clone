import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        centered && "sm:flex-col sm:items-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", centered && "text-center")}>
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            <span className="h-px w-6 bg-brand-500" />
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-bold text-ink-950 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-ink-500">{description}</p>
        )}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}
