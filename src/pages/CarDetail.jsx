import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Check,
  Fuel,
  Gauge,
  MapPin,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import Reveal from "@/components/ui/Reveal";
import CarCard from "@/components/cars/CarCard";
import SectionHeading from "@/components/ui/SectionHeading";
import useBookingStore from "@/store/useBookingStore";
import { cars, getCarById, plans, priceForPlan } from "@/data/cars";
import { addOnCatalog, quote } from "@/lib/pricing";
import DateRangePicker from "@/components/booking/DateRangePicker";
import { cn, daysBetween, formatINR, formatNumber } from "@/lib/utils";

export default function CarDetail() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const car = getCarById(carId);
  const store = useBookingStore();
  const [planId, setPlanId] = useState(store.planId);
  const [addOns, setAddOns] = useState(store.addOns);

  if (!car) return <Navigate to="/cars" replace />;

  const estimate = quote({
    car,
    planId,
    startDate: store.startDate,
    endDate: store.endDate,
    addOns,
  });

  const specs = [
    { icon: Users, label: "Seats", value: car.seats },
    { icon: Settings2, label: "Gearbox", value: car.transmission },
    { icon: Fuel, label: "Fuel", value: car.fuel },
    { icon: Gauge, label: "Mileage", value: `${car.mileage} km/l` },
    { icon: Briefcase, label: "Luggage", value: `${car.bags} bags` },
    { icon: BadgeCheck, label: "Model year", value: car.year },
  ];

  const toggleAddOn = (id) =>
    setAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const proceed = () => {
    store.setSearch({ planId, addOns, carId: car.id });
    navigate("/checkout");
  };

  const similar = cars
    .filter((item) => item.id !== car.id && item.segment === car.segment)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title={car.name}
        breadcrumbs={[{ label: "Self drive cars", to: "/cars" }, { label: car.name }]}
      />

      <div className="container-page py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div>
            <Reveal className="overflow-hidden rounded-3xl bg-ink-100">
              <img
                src={car.image}
                alt={car.name}
                className="aspect-[16/10] w-full object-cover"
              />
            </Reveal>

            <Reveal delay={0.06} className="mt-6 flex flex-wrap items-center gap-3">
              {car.tags.map((tag) => (
                <Badge key={tag} tone="brand">
                  {tag}
                </Badge>
              ))}
              <Rating value={car.rating} />
              <span className="text-sm font-semibold text-ink-500">
                {formatNumber(car.trips)} trips completed
              </span>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <h2 className="font-display text-xl font-bold text-ink-950">Specifications</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                    <Icon size={18} className="text-brand-500" />
                    <dt className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-400">
                      {label}
                    </dt>
                    <dd className="text-base font-bold text-ink-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.14} className="mt-10">
              <h2 className="font-display text-xl font-bold text-ink-950">
                What this car is good for
              </h2>
              <ul className="mt-4 space-y-3">
                {car.highlights.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={13} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-600">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18} className="mt-10 rounded-3xl bg-ink-950 p-7 text-white">
              <ShieldCheck size={24} className="text-brand-400" />
              <h2 className="mt-4 font-display text-xl font-bold">Included on every booking</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Comprehensive insurance", "Zero depreciation cover, no paperwork"],
                  ["24x7 roadside assistance", "Anywhere in India, replacement car included"],
                  ["Sanitised handover", "Deep cleaned and photo-verified"],
                  ["Free cancellation", "Up to 24 hours before pickup"],
                ].map(([title, body]) => (
                  <div key={title}>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="mt-1 text-sm text-ink-400">{body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface p-6 sm:p-7">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-400">
                    Your price
                  </p>
                  <p className="font-display text-3xl font-extrabold text-ink-950">
                    {formatINR(estimate.perDay)}
                    <span className="text-base font-semibold text-ink-400">/day</span>
                  </p>
                </div>
                <Badge tone="success">Available</Badge>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-ink-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-ink-900">
                    <MapPin size={14} className="text-brand-500" />
                    {store.city}
                  </span>
                  <span className="text-sm font-bold text-ink-700">
                    {daysBetween(store.startDate, store.endDate)} days
                  </span>
                </div>

                <DateRangePicker
                  startDate={store.startDate}
                  endDate={store.endDate}
                  startTime={store.startTime}
                  endTime={store.endTime}
                  onChange={(patch) => store.setSearch(patch)}
                />
              </div>

              <div className="mt-6">
                <p className="field-label">Kilometre plan</p>
                <div className="grid gap-2">
                  {plans.map((plan) => {
                    const active = plan.id === planId;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setPlanId(plan.id)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition",
                          active
                            ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/20"
                            : "border-ink-200 hover:border-ink-400",
                        )}
                      >
                        <span>
                          <span className="block text-sm font-bold text-ink-900">
                            {plan.label}
                          </span>
                          <span className="block text-xs font-medium text-ink-500">
                            ₹{car.extraKmCharge}/km beyond the limit
                          </span>
                        </span>
                        <span
                          className={cn(
                            "text-sm font-extrabold",
                            active ? "text-brand-600" : "text-ink-700",
                          )}
                        >
                          {formatINR(priceForPlan(car, plan.id))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <p className="field-label">Add-ons</p>
                <div className="space-y-2">
                  {addOnCatalog.map((item) => {
                    const active = addOns.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-2.5 transition",
                          active ? "border-ink-900 bg-ink-50" : "border-ink-200 hover:border-ink-400",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => toggleAddOn(item.id)}
                            className="size-4 accent-brand-500"
                          />
                          <span className="text-sm font-semibold text-ink-800">{item.label}</span>
                        </span>
                        <span className="shrink-0 text-sm font-bold text-ink-600">
                          {item.price === 0 ? "Free" : `${formatINR(item.price)}/${item.unit}`}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <dl className="mt-6 space-y-2 border-t border-ink-100 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-500">
                    {formatINR(estimate.perDay)} × {estimate.days} days
                  </dt>
                  <dd className="font-bold text-ink-900">{formatINR(estimate.subtotal)}</dd>
                </div>
                {estimate.addOnTotal > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-ink-500">Add-ons</dt>
                    <dd className="font-bold text-ink-900">{formatINR(estimate.addOnTotal)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-ink-500">GST (18%)</dt>
                  <dd className="font-bold text-ink-900">{formatINR(estimate.tax)}</dd>
                </div>
                <div className="flex justify-between border-t border-ink-100 pt-3">
                  <dt className="font-display text-base font-bold text-ink-950">Total</dt>
                  <dd className="font-display text-xl font-extrabold text-ink-950">
                    {formatINR(estimate.total)}
                  </dd>
                </div>
                <p className="text-xs text-ink-400">
                  Refundable deposit of {formatINR(car.deposit)} is blocked at pickup.
                </p>
              </dl>

              <Button size="lg" className="mt-6 w-full" onClick={proceed}>
                Continue to checkout
                <ArrowRight size={17} />
              </Button>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-20">
            <SectionHeading eyebrow="Similar cars" title={`More ${car.segment}s in ${store.city}`} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item, index) => (
                <CarCard key={item.id} car={item} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
