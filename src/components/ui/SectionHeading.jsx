import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const sizes = {
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl lg:text-[2.5rem]",
  lg: "text-3xl sm:text-4xl lg:text-5xl",
};

const tones = {
  light: {
    eyebrow: "border-brand-100 bg-brand-50 text-brand-700",
    dot: "bg-brand-500",
    title: "text-ink-950",
    description: "text-ink-500",
  },
  dark: {
    eyebrow: "border-brand-500/25 bg-brand-500/10 text-brand-300",
    dot: "bg-brand-400",
    title: "text-white",
    description: "text-ink-300",
  },
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  tone = "light",
  action,
  className,
}) {
  const centered = align === "center";
  const palette = tones[tone] ?? tones.light;

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between sm:gap-10",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", centered && "mx-auto flex flex-col items-center")}>
        {eyebrow && (
          <span
            className={cn(
              "mb-4 inline-flex items-center gap-2 rounded-full border py-1 pl-2 pr-3.5 text-[11px] font-extrabold uppercase tracking-[0.16em]",
              palette.eyebrow,
            )}
          >
            <span className={cn("size-1.5 rounded-full", palette.dot)} />
            {eyebrow}
          </span>
        )}

        <h2
          className={cn(
            "text-balance font-bold leading-[1.12]",
            palette.title,
            sizes[size] ?? sizes.md,
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              "mt-4 max-w-xl text-pretty text-[15px] leading-relaxed sm:text-base",
              palette.description,
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </Reveal>

      {action && (
        <Reveal delay={0.1} className={cn("shrink-0", centered && "mt-2")}>
          {action}
        </Reveal>
      )}
    </div>
  );
}
