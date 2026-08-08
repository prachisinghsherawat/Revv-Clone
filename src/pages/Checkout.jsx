import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  Tag,
  Ticket,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/layout/PageHeader";
import CarStage from "@/components/cars/CarStage";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import useBookingStore from "@/store/useBookingStore";
import useAuthStore from "@/store/useAuthStore";
import { getCarById } from "@/data/cars";
import { coupons } from "@/data/content";
import { quote } from "@/lib/pricing";
import { bookingReference, cn, formatDate, formatINR } from "@/lib/utils";

const methods = [
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm", icon: Smartphone },
  { id: "card", label: "Card", hint: "Credit or debit", icon: CreditCard },
  { id: "netbanking", label: "Net banking", hint: "All major banks", icon: Banknote },
];

export default function Checkout() {
  const navigate = useNavigate();
  const store = useBookingStore();
  const { user } = useAuthStore();
  const car = getCarById(store.carId);

  const [method, setMethod] = useState("upi");
  const [couponInput, setCouponInput] = useState("");
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      licence: "",
    },
  });

  if (!car) return <Navigate to="/cars" replace />;

  const estimate = quote({
    car,
    planId: store.planId,
    startDate: store.startDate,
    endDate: store.endDate,
    addOns: store.addOns,
    couponCode: store.coupon,
  });

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (!coupons[code]) {
      toast.error("That coupon is not valid on this booking");
      return;
    }
    store.applyCoupon(code);
    setCouponInput("");
    toast.success(coupons[code].label);
  };

  const onSubmit = (values) => {
    setProcessing(true);
    setTimeout(() => {
      const booking = {
        reference: bookingReference(),
        carId: car.id,
        carName: car.name,
        carSegment: car.segment,
        carColor: car.color,
        city: store.city,
        startDate: store.startDate,
        endDate: store.endDate,
        startTime: store.startTime,
        endTime: store.endTime,
        planId: store.planId,
        method,
        customer: values,
        amount: estimate.total,
        deposit: estimate.deposit,
        createdAt: new Date().toISOString(),
      };
      store.confirmBooking(booking);
      setProcessing(false);
      navigate(`/booking/${booking.reference}`);
    }, 1400);
  };

  return (
    <>
      <PageHeader
        title="Checkout"
        description="Confirm your details and pay. The deposit is blocked separately at pickup."
        breadcrumbs={[
          { label: "Self drive cars", to: "/cars" },
          { label: car.name, to: `/cars/${car.id}` },
          { label: "Checkout" },
        ]}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container-page grid gap-10 py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:py-14"
      >
        <div className="space-y-8">
          <section className="card-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink-950">Driver details</h2>
            <p className="mt-1 text-sm text-ink-500">
              These must match the documents you bring to pickup.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">
                  Full name
                </label>
                <input
                  id="name"
                  className="field-input"
                  placeholder="As printed on your licence"
                  {...register("name", { required: "Enter your full name" })}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-semibold text-ink-950">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="field-label">
                  Mobile number
                </label>
                <input
                  id="phone"
                  inputMode="numeric"
                  className="field-input"
                  placeholder="10 digit number"
                  {...register("phone", {
                    required: "Enter your mobile number",
                    pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid Indian mobile number" },
                  })}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs font-semibold text-ink-950">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="field-input"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Enter your email",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  })}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs font-semibold text-ink-950">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="licence" className="field-label">
                  Driving licence number
                </label>
                <input
                  id="licence"
                  className="field-input uppercase"
                  placeholder="DL-0420110149646"
                  {...register("licence", {
                    required: "Enter your licence number",
                    minLength: { value: 8, message: "Licence numbers are at least 8 characters" },
                  })}
                />
                {errors.licence && (
                  <p className="mt-1.5 text-xs font-semibold text-ink-950">
                    {errors.licence.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="card-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink-950">Payment method</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {methods.map(({ id, label, hint, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition",
                    method === id
                      ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/20"
                      : "border-ink-200 hover:border-ink-400",
                  )}
                >
                  <Icon
                    size={20}
                    className={method === id ? "text-brand-700" : "text-ink-400"}
                  />
                  <p className="mt-3 text-sm font-bold text-ink-900">{label}</p>
                  <p className="text-xs font-medium text-ink-500">{hint}</p>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={method}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-6 rounded-2xl bg-ink-50 p-5"
              >
                {method === "upi" && (
                  <div>
                    <label htmlFor="upi" className="field-label">
                      UPI ID
                    </label>
                    <input id="upi" className="field-input" placeholder="yourname@upi" />
                  </div>
                )}
                {method === "card" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="card" className="field-label">
                        Card number
                      </label>
                      <input
                        id="card"
                        inputMode="numeric"
                        className="field-input"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div>
                      <label htmlFor="expiry" className="field-label">
                        Expiry
                      </label>
                      <input id="expiry" className="field-input" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="field-label">
                        CVV
                      </label>
                      <input id="cvv" type="password" className="field-input" placeholder="•••" />
                    </div>
                  </div>
                )}
                {method === "netbanking" && (
                  <div>
                    <label htmlFor="bank" className="field-label">
                      Choose your bank
                    </label>
                    <select id="bank" className="field-input">
                      {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak"].map(
                        (bank) => (
                          <option key={bank}>{bank}</option>
                        ),
                      )}
                    </select>
                  </div>
                )}
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink-500">
                  <Lock size={13} />
                  This is a demo checkout. No card is charged and nothing is sent anywhere.
                </p>
              </motion.div>
            </AnimatePresence>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface overflow-hidden">
            <div className="flex gap-4 border-b border-ink-100 p-5">
              <CarStage car={car} className="size-20 shrink-0 rounded-xl" modelClassName="px-1" />
              <div>
                <h2 className="font-display text-base font-bold leading-tight text-ink-950">
                  {car.name}
                </h2>
                <p className="mt-1 text-xs font-semibold text-ink-500">
                  {store.city} · {estimate.days} days
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-500">
                  {formatDate(store.startDate)} → {formatDate(store.endDate)}
                </p>
              </div>
            </div>

            <div className="p-5">
              {store.coupon ? (
                <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-brand-700">
                    <Ticket size={15} />
                    {store.coupon} applied
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      store.clearCoupon();
                      toast("Coupon removed");
                    }}
                    aria-label="Remove coupon"
                    className="text-brand-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                    />
                    <input
                      value={couponInput}
                      onChange={(event) => setCouponInput(event.target.value)}
                      placeholder="Coupon code"
                      aria-label="Coupon code"
                      className="field-input pl-10 uppercase"
                    />
                  </div>
                  <Button type="button" variant="dark" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>
              )}

              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-500">
                    {formatINR(estimate.perDay)} × {estimate.days} days
                  </dt>
                  <dd className="font-bold text-ink-900">{formatINR(estimate.subtotal)}</dd>
                </div>

                {estimate.addOnLines.map((line) => (
                  <div key={line.id} className="flex justify-between">
                    <dt className="text-ink-500">{line.label}</dt>
                    <dd className="font-bold text-ink-900">
                      {line.total === 0 ? "Free" : formatINR(line.total)}
                    </dd>
                  </div>
                ))}

                {estimate.discount > 0 && (
                  <div className="flex justify-between text-brand-700">
                    <dt className="font-semibold">Discount</dt>
                    <dd className="font-bold">−{formatINR(estimate.discount)}</dd>
                  </div>
                )}

                <div className="flex justify-between">
                  <dt className="text-ink-500">GST (18%)</dt>
                  <dd className="font-bold text-ink-900">{formatINR(estimate.tax)}</dd>
                </div>

                <div className="flex items-end justify-between border-t border-ink-100 pt-4">
                  <dt className="font-display text-base font-bold text-ink-950">Pay now</dt>
                  <dd className="font-display text-2xl font-extrabold text-ink-950">
                    {formatINR(estimate.total)}
                  </dd>
                </div>

                <div className="flex justify-between rounded-xl bg-ink-50 px-4 py-3">
                  <dt className="text-xs font-semibold text-ink-500">
                    Refundable deposit at pickup
                  </dt>
                  <dd className="text-xs font-bold text-ink-800">{formatINR(estimate.deposit)}</dd>
                </div>
              </dl>

              <Button type="submit" size="lg" className="mt-5 w-full" disabled={processing}>
                {processing ? "Processing payment…" : `Pay ${formatINR(estimate.total)}`}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2">
                <Badge tone="success">
                  <ShieldCheck size={12} />
                  Free cancellation
                </Badge>
                <Badge tone="neutral">
                  <Lock size={12} />
                  Secure
                </Badge>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </>
  );
}
