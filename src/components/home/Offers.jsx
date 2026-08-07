import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Copy, Tag } from "lucide-react";
import toast from "react-hot-toast";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { offers } from "@/data/content";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";

export default function Offers() {
  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`Coupon ${code} copied. Apply it at checkout.`);
    } catch {
      toast(`Use coupon ${code} at checkout`);
    }
  };

  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Offers"
        title="Deals running this week"
        description="Tap a card to copy the coupon, then paste it on the payment page."
      />

      <Reveal className="mt-10" delay={0.05}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1.1}
          autoplay={{ delay: 3800, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-12"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <button
                type="button"
                onClick={() => copyCode(offer.code)}
                className={cn(
                  "group relative flex h-56 w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-left text-white transition-transform duration-300 hover:-translate-y-1.5",
                  offer.accent,
                )}
              >
                <span className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/20" />
                <Tag size={22} className="opacity-80" />
                <div>
                  <h3 className="font-display text-xl font-bold leading-tight">{offer.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{offer.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-white/50 px-3 py-1.5 text-xs font-bold tracking-wider">
                    {offer.code}
                    <Copy size={13} />
                  </span>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  );
}
