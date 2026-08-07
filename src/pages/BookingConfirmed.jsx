import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Download, MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import useBookingStore from "@/store/useBookingStore";
import config from "@/lib/config";
import { formatDate, formatINR } from "@/lib/utils";

export default function BookingConfirmed() {
  const { reference } = useParams();
  const bookings = useBookingStore((state) => state.bookings);
  const booking = bookings.find((item) => item.reference === reference);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 250);
    return () => clearTimeout(timer);
  }, []);

  if (!booking) {
    return (
      <div className="container-page py-24">
        <EmptyState
          title="We could not find that booking"
          description="The reference may be from another device. Bookings are stored locally in this demo."
        />
        <div className="mt-8 flex justify-center">
          <Button to="/cars">Browse cars</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-14 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", damping: 14, stiffness: 220 }}
          className="mx-auto grid size-20 place-items-center rounded-3xl bg-emerald-500 text-white shadow-lift"
        >
          <CheckCircle2 size={40} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">Your car is booked</h1>
          <p className="mt-3 text-base text-ink-500">
            A confirmation is on its way to {booking.customer.email}. Carry your original licence
            and ID to pickup.
          </p>
          <Badge tone="dark" className="mt-5 text-sm">
            Booking {booking.reference}
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-surface mt-10 overflow-hidden"
        >
          <div className="flex gap-5 border-b border-ink-100 p-6">
            <img
              src={booking.carImage}
              alt={booking.carName}
              className="size-24 shrink-0 rounded-2xl object-cover"
            />
            <div>
              <h2 className="font-display text-lg font-bold text-ink-950">{booking.carName}</h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-ink-500">
                <MapPin size={14} className="text-brand-500" />
                {booking.city}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-ink-500">
                <CalendarDays size={14} className="text-brand-500" />
                {formatDate(booking.startDate)} {booking.startTime} → {formatDate(booking.endDate)}{" "}
                {booking.endTime}
              </p>
            </div>
          </div>

          <dl className="grid gap-px bg-ink-100 sm:grid-cols-3">
            <div className="bg-white p-5">
              <dt className="field-label">Amount paid</dt>
              <dd className="font-display text-xl font-extrabold text-ink-950">
                {formatINR(booking.amount)}
              </dd>
            </div>
            <div className="bg-white p-5">
              <dt className="field-label">Deposit at pickup</dt>
              <dd className="font-display text-xl font-extrabold text-ink-950">
                {formatINR(booking.deposit)}
              </dd>
            </div>
            <div className="bg-white p-5">
              <dt className="field-label">Paid via</dt>
              <dd className="font-display text-xl font-extrabold capitalize text-ink-950">
                {booking.method}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 border-t border-ink-100 p-6 sm:flex-row">
            <Button variant="dark" className="flex-1" onClick={() => window.print()}>
              <Download size={16} />
              Save receipt
            </Button>
            <Button variant="outline" className="flex-1" href={`tel:${config.supportPhone}`}>
              <Phone size={16} />
              Call support
            </Button>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-sm text-ink-500">
          Need something else?{" "}
          <Link to="/cars" className="font-bold text-brand-600 hover:underline">
            Book another car
          </Link>
        </p>
      </div>
    </div>
  );
}
