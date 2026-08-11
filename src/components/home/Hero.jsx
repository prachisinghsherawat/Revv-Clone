import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useBookingStore from "@/store/useBookingStore";
import HeroSearchCard from "@/components/booking/HeroSearchCard";
import HeroPromoSlider from "./HeroPromoSlider";

export default function Hero() {
  const city = useBookingStore((state) => state.city);

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(160deg,var(--color-brand-200)_0%,var(--color-brand-50)_45%,#ffffff_100%)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* aurora blobs */}
        <span className="absolute -left-32 -top-44 size-[42rem] rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_62%)] opacity-70 blur-3xl motion-safe:animate-drift" />
        <span className="absolute -right-44 -top-28 size-[38rem] rounded-full bg-[radial-gradient(circle,#818cf8_0%,transparent_62%)] opacity-55 blur-3xl motion-safe:animate-drift-slow" />
        <span className="absolute -bottom-52 left-[28%] size-[34rem] rounded-full bg-[radial-gradient(circle,#22d3ee_0%,transparent_62%)] opacity-50 blur-3xl motion-safe:animate-drift-slow" />

        {/* structure */}
        <span className="hero-grid absolute inset-0" />
        <span className="hero-dots absolute inset-0" />

        {/* spotlight lifting the search card */}
        <span className="absolute left-0 top-1/4 h-[30rem] w-[45%] bg-[radial-gradient(closest-side,rgb(255_255_255/0.85),transparent)] blur-2xl" />

        {/* glare sweep + blend into the next section */}
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-white/70 to-white" />
      </div>

      <div className="container-page relative pb-14 pt-6 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-ink-600 shadow-card backdrop-blur-md">
            Car rental in {city}
            <Link to="/cars" className="font-bold text-brand-700 hover:underline">
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
