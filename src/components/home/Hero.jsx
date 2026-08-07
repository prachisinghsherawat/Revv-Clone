import { motion } from "framer-motion";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CheckCircle2, Star } from "lucide-react";
import SearchWidget from "@/components/booking/SearchWidget";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = ["/images/thirdimage.jpg", "/images/firstimage.jpg", "/images/secondimage.jpg"];

const assurances = ["Insurance included", "Sanitised cars", "Doorstep delivery"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={1200}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          allowTouchMove={false}
          className="h-full w-full"
        >
          {slides.map((src) => (
            <SwiperSlide key={src}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
      </div>

      <div className="container-page relative py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur"
            >
              <Star size={13} className="fill-amber-400 text-amber-400" />
              4.4 average from 2.1 lakh trips
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
            >
              Car rental in India,
              <span className="block text-brand-400">without the counter queue</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300"
            >
              The largest company-owned fleet in the country. Pick a car, pick a plan, and drive
              away in minutes — insurance, sanitisation and roadside help already included.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            >
              {assurances.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 size={17} className="text-brand-400" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <SearchWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
