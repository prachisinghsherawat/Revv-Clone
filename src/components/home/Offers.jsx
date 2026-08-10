import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Check, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import toast from "react-hot-toast";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { offers } from "@/data/content";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";

function OfferTicket({ offer, copied, onCopy }) {
  const isCopied = copied === offer.code;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
      style={{ backgroundImage: `linear-gradient(135deg, ${offer.from} 0%, ${offer.to} 100%)` }}
    >
      {/* soft light so every card in the row shares the same lighting */}
      <span className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full bg-white/20 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
      <span className="pointer-events-none absolute -bottom-24 -left-12 size-48 rounded-full bg-black/25 blur-3xl" />

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white/90 ring-1 ring-inset ring-white/25">
            {offer.badge}
          </span>
          <span className="flex items-baseline gap-1 font-display leading-none">
            <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">{offer.value}</span>
            <span className="text-xs font-extrabold tracking-widest text-white/75">{offer.unit}</span>
          </span>
        </div>

        <h3 className="mt-6 text-pretty font-display text-lg font-extrabold leading-snug sm:text-xl">
          {offer.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{offer.subtitle}</p>

        <p className="mt-auto pt-6 text-[11px] font-semibold uppercase tracking-wider text-white/65">
          {offer.terms} · Valid till {offer.expires}
        </p>
      </div>

      {/* perforated tear line, punched by the two notches */}
      <div className="relative">
        <span className="absolute -left-2.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-ink-50" />
        <span className="absolute -right-2.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-ink-50" />
        <span className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-white/30" />
      </div>

      <div className="relative flex items-center gap-3 bg-black/15 p-4 sm:px-7 sm:py-5">
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-white/60">
            Coupon code
          </span>
          <span className="block truncate font-display text-lg font-extrabold tracking-[0.12em]">
            {offer.code}
          </span>
        </span>

        <button
          type="button"
          onClick={() => onCopy(offer.code)}
          aria-label={`Copy coupon code ${offer.code}`}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition",
            isCopied
              ? "bg-white text-ink-950"
              : "bg-white/15 text-white ring-1 ring-inset ring-white/30 hover:bg-white hover:text-ink-950",
          )}
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
    </article>
  );
}

export default function Offers() {
  const swiperRef = useRef(null);
  const [copied, setCopied] = useState(null);

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied((current) => (current === code ? null : current)), 2000);
      toast.success(`Coupon ${code} copied. Apply it at checkout.`);
    } catch {
      toast(`Use coupon ${code} at checkout`);
    }
  };

  return (
    <section className="overflow-hidden bg-ink-50 py-16 lg:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Offers"
          title="Deals running this week"
          description="Copy a code here, then paste it into the coupon box on the payment page. Only one coupon applies per booking."
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
          modules={[Autoplay, Pagination, Keyboard, A11y]}
          grabCursor
          loop
          watchSlidesProgress
          keyboard={{ enabled: true }}
          slidesPerView={1.1}
          spaceBetween={16}
          autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.1, spaceBetween: 20 },
            1024: { slidesPerView: 3.1, spaceBetween: 24 },
            1440: { slidesPerView: 4.1, spaceBetween: 24 },
          }}
          className="!px-4 !pb-14 sm:!px-6 lg:!px-10"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id} className="!h-auto">
              <OfferTicket offer={offer} copied={copied} onCopy={copyCode} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  );
}
