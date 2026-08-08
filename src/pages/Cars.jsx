import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FilterPanel from "@/components/cars/FilterPanel";
import CarCard from "@/components/cars/CarCard";
import SearchWidget from "@/components/booking/SearchWidget";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { CarCardSkeleton } from "@/components/ui/Skeleton";
import useBookingStore from "@/store/useBookingStore";
import { cars, priceBounds } from "@/data/cars";
import { cn, daysBetween, formatDateShort } from "@/lib/utils";

const sortOptions = [
  { id: "popular", label: "Most popular" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
  { id: "seats", label: "Most seats" },
];

const emptyFilters = {
  segment: [],
  brand: [],
  transmission: [],
  fuel: [],
  seats: [],
  maxPrice: priceBounds.max,
};

export default function Cars() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { city, startDate, endDate } = useBookingStore();

  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    segment: searchParams.get("segment") ? [searchParams.get("segment")] : [],
  }));
  const [sort, setSort] = useState(searchParams.get("sort") ?? "popular");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingSearch, setEditingSearch] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 9;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const changeSort = (value) => {
    setSort(value);
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (value === "popular") next.delete("sort");
    else next.set("sort", value);
    setSearchParams(next, { replace: true });
  };

  const toggleFilter = (key, value) => {
    setPage(1);
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = cars.filter((car) => {
      if (filters.segment.length && !filters.segment.includes(car.segment)) return false;
      if (filters.brand.length && !filters.brand.includes(car.brand)) return false;
      if (filters.transmission.length && !filters.transmission.includes(car.transmission))
        return false;
      if (filters.fuel.length && !filters.fuel.includes(car.fuel)) return false;
      if (filters.seats.length && !filters.seats.includes(String(car.seats))) return false;
      if (car.priceFrom > filters.maxPrice) return false;
      if (term && !`${car.name} ${car.brand} ${car.segment}`.toLowerCase().includes(term))
        return false;
      return true;
    });

    const sorters = {
      popular: (a, b) => b.trips - a.trips,
      "price-asc": (a, b) => a.priceFrom - b.priceFrom,
      "price-desc": (a, b) => b.priceFrom - a.priceFrom,
      rating: (a, b) => b.rating - a.rating,
      seats: (a, b) => b.seats - a.seats,
    };

    return [...filtered].sort(sorters[sort] ?? sorters.popular);
  }, [filters, sort, query]);

  const totalPages = Math.max(1, Math.ceil(results.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = results.slice((currentPage - 1) * perPage, currentPage * perPage);

  const goToPage = (next) => {
    setPage(next);
    window.scrollTo({ top: 260, behavior: "smooth" });
  };

  const activeCount =
    filters.segment.length +
    filters.brand.length +
    filters.transmission.length +
    filters.fuel.length +
    filters.seats.length +
    (filters.maxPrice < priceBounds.max ? 1 : 0);

  const panel = (
    <FilterPanel
      filters={filters}
      onToggle={toggleFilter}
      onChange={(patch) => setFilters((current) => ({ ...current, ...patch }))}
      onReset={() => setFilters(emptyFilters)}
      resultCount={results.length}
    />
  );

  return (
    <>
      <PageHeader
        title="Self drive cars"
        description="Every car below is company owned, insured and sanitised before it reaches you."
        breadcrumbs={[{ label: "Self drive cars" }]}
      />

      <div className="container-page py-8 lg:py-12">
        <div className="card-surface mb-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2 text-sm font-bold text-ink-900">
              <MapPin size={16} className="text-brand-500" />
              {city}
            </span>
            <span className="flex items-center gap-2 text-sm font-bold text-ink-900">
              <CalendarDays size={16} className="text-brand-500" />
              {formatDateShort(startDate)} — {formatDateShort(endDate)}
              <span className="text-ink-400">({daysBetween(startDate, endDate)} days)</span>
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEditingSearch((open) => !open)}>
            {editingSearch ? "Close" : "Change search"}
          </Button>
        </div>

        <AnimatePresence>
          {editingSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <SearchWidget variant="compact" onSearch={() => setEditingSearch(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">{panel}</div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by model or brand"
                  className="field-input pl-11"
                  aria-label="Search cars"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="relative flex h-12 items-center gap-2 rounded-xl border border-ink-200 px-4 text-sm font-bold text-ink-800 lg:hidden"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                  {activeCount > 0 && (
                    <span className="grid size-5 place-items-center rounded-full bg-brand-500 text-[11px] text-white">
                      {activeCount}
                    </span>
                  )}
                </button>

                <select
                  value={sort}
                  onChange={(event) => changeSort(event.target.value)}
                  aria-label="Sort cars"
                  className="field-input h-12 w-full py-0 sm:w-52"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CarCardSkeleton key={index} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <EmptyState
                title="No cars match those filters"
                description="Try widening your price range or clearing a couple of filters."
                actionLabel="Clear all filters"
                onAction={() => {
                  setFilters(emptyFilters);
                  setQuery("");
                }}
              />
            ) : (
              <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center gap-4">
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onChange={goToPage}
                />
                <p className="text-xs font-semibold text-ink-500">
                  Showing {(currentPage - 1) * perPage + 1}–
                  {Math.min(currentPage * perPage, results.length)} of {results.length} cars
                </p>
              </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className={cn("fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm lg:hidden")}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              onClick={(event) => event.stopPropagation()}
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">Refine results</h2>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="grid size-10 place-items-center rounded-xl border border-ink-200"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>
              {panel}
              <Button size="lg" className="mt-4 w-full" onClick={() => setDrawerOpen(false)}>
                Show {results.length} cars
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
