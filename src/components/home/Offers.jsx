import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Copy, Tag } from "lucide-react";
import toast from "react-hot-toast";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { offers } from "@/data/content";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Offers() {
  const swiperRef = useRef(null);
  const [copied, setCopied] = useState(null);

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(null), 1800);
      toast.success(`Coupon ${code} copied. Apply it at checkout.`);
    } catch {
      toast(`Use coupon ${code} at checkout`);
    }
  };

  return (
    <section className="overflow-hidden bg-ink-50/70 py-16 lg:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Offers"
          title="Deals running this week"
          description="Tap a card to copy the coupon, then paste it on the payment page."
          action={
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous offer"
                className="grid size-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-ink-900 hover:bg-ink-900 hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next offer"
                className="grid size-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-ink-900 hover:bg-ink-900 hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          }
        />
      </div>

      <Reveal className="mt-12" delay={0.05}>
        <Swiper
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          modules={[Autoplay, Pagination, Navigation, Keyboard, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          keyboard={{ enabled: true }}
          slidesPerView={1.15}
          spaceBetween={16}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 180,
            modifier: 2.2,
            slideShadows: false,
          }}
          autoplay={{ delay: 3800, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.8, spaceBetween: 20 },
            1024: { slidesPerView: 2.6, spaceBetween: 24 },
            1280: { slidesPerView: 3.2, spaceBetween: 28 },
          }}
          className="!px-4 !pb-14 sm:!px-6"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id} className="!h-auto">
              {({ isActive }) => (
                <button
                  type="button"
                  onClick={() => copyCode(offer.code)}
                  className={cn(
                    "group relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-7 text-left text-white transition-all duration-500",
                    offer.accent,
                    isActive ? "shadow-lift" : "opacity-70 saturate-75",
                  )}
                >
                  <span className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-white/15 blur-2xl transition-all duration-500 group-hover:bg-white/25" />
                  <span className="pointer-events-none absolute -bottom-16 -left-10 size-40 rounded-full bg-black/15 blur-2xl" />

                  <Tag size={24} className="relative opacity-90" />

                  <div className="relative">
                    <h3 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">
                      {offer.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/85">{offer.subtitle}</p>
                    <span
                      className={cn(
                        "mt-5 inline-flex items-center gap-2 rounded-xl border border-dashed px-3.5 py-2 text-xs font-extrabold tracking-widest transition",
                        copied === offer.code
                          ? "border-white bg-white text-ink-950"
                          : "border-white/60 group-hover:bg-white/15",
                      )}
                    >
                      {copied === offer.code ? "Copied" : offer.code}
                      <Copy size={13} />
                    </span>
                  </div>
                </button>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  );
}
