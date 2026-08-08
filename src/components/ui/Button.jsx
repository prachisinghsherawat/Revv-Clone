import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-ink-950 text-white shadow-glow hover:bg-ink-800 active:bg-black disabled:bg-ink-400",
  accent:
    "bg-brand-600 text-white shadow-glow-accent hover:bg-brand-700 active:bg-brand-800 disabled:bg-brand-300",
  dark: "bg-ink-900 text-white hover:bg-ink-700 active:bg-ink-950 disabled:bg-ink-400",
  outline:
    "border border-ink-200 bg-white text-ink-900 hover:border-ink-900 hover:bg-ink-50 disabled:text-ink-400",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
  soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
};

const sizes = {
  sm: "h-9 gap-1.5 rounded-lg px-3.5 text-sm",
  md: "h-11 gap-2 rounded-xl px-5 text-sm",
  lg: "h-13 gap-2.5 rounded-xl px-7 text-base",
};

export default function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex select-none items-center justify-center font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  const Component = as ?? "button";
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
