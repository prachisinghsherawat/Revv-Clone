import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageCircle, Phone, Search } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";
import { faqCategories, faqs } from "@/data/content";
import config from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Faq() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const category = searchParams.get("category") ?? "All";

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "All") next.delete("category");
    else next.set("category", value);
    setSearchParams(next);
  };

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return faqs.filter((faq) => {
      if (category !== "All" && faq.category !== category) return false;
      if (term && !`${faq.question} ${faq.answer}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [category, query]);

  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        description="Everything about booking, driving, paying and returning a Revv car."
        breadcrumbs={[{ label: "FAQs" }]}
      />

      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search questions"
                aria-label="Search FAQs"
                className="field-input pl-11"
              />
            </div>

            <nav className="mt-5 flex flex-wrap gap-2 lg:flex-col">
              {["All", ...faqCategories].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm font-bold transition lg:text-left",
                    category === item
                      ? "bg-ink-900 text-white"
                      : "bg-ink-50 text-ink-600 hover:bg-ink-100",
                  )}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="mt-8 rounded-3xl bg-brand-50 p-6">
              <MessageCircle size={22} className="text-brand-600" />
              <h2 className="mt-4 font-display text-lg font-bold text-ink-950">
                Still need a hand?
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                Support answers in under a minute, any hour of the day.
              </p>
              <Button
                variant="dark"
                size="sm"
                className="mt-4 w-full"
                href={`tel:${config.supportPhone}`}
              >
                <Phone size={15} />
                {config.supportPhone}
              </Button>
            </div>
          </aside>

          <div>
            {results.length === 0 ? (
              <EmptyState
                title="No answers matched that search"
                description="Try a shorter phrase, or call support and we will sort it out."
                actionLabel="Clear search"
                onAction={() => {
                  setQuery("");
                  setCategory("All");
                }}
              />
            ) : (
              <Reveal>
                <p className="mb-5 text-sm font-semibold text-ink-500">
                  Showing {results.length} of {faqs.length} questions
                </p>
                <Accordion items={results} allowMultiple />
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
