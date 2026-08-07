import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function PageHeader({ title, description, breadcrumbs = [] }) {
  return (
    <section className="border-b border-ink-100 bg-gradient-to-b from-ink-50 to-white">
      <div className="container-page py-10 lg:py-14">
        <Reveal>
          <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-ink-500">
            <Link to="/" className="transition hover:text-brand-600">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight size={13} className="text-ink-300" />
                {crumb.to ? (
                  <Link to={crumb.to} className="transition hover:text-brand-600">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink-900">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold text-ink-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-500">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
