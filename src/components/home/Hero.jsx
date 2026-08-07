import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useBookingStore from "@/store/useBookingStore";
import HeroSearchCard from "@/components/booking/HeroSearchCard";
import HeroPromoSlider from "./HeroPromoSlider";

export default function Hero() {
  const city = useBookingStore((state) => state.city);

  return (
    <section className="relative overflow-hidden bg-sky-50">
      <span className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-white/50 blur-3xl" />

      <div className="container-page relative pb-14 pt-6 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-semibold text-ink-600 shadow-card">
            Car rental in {city}
            <Link to="/cars" className="font-bold text-blue-600 hover:underline">
              Know more
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-lg lg:mx-0"
          >
            <HeroSearchCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroPromoSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
