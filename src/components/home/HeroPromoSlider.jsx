import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";

const promos = [
  {
    id: "subscribe",
    title: (
      <>
        Subscribe a car{" "}
        <span className="whitespace-nowrap text-blue-600">
          @ ₹<span className="text-[1.15em]">570</span>
          <span className="text-[0.55em] font-bold align-baseline">/day</span>
        </span>
      </>
    ),
    points: [
      "Only ₹5,000 refundable deposit",
      "No loan liability, zero downpayment",
      "Insurance & maintenance included",
    ],
    image: "/images/subscription/subscribe-car.png",
    alt: "Red SUV available on subscription",
    tick: "bg-emerald-200 text-emerald-900",
    button: "border-brand-400 hover:bg-brand-500 hover:border-brand-500 hover:text-white",
    to: "/cars?sort=price-asc",
  },
  {
    id: "monthly",
    title: "Monthly car subscriptions",
    points: [
      "For 1, 2, 3 months or 7, 15 days",
      "Extend or return anytime",
      "Doorstep delivery in 3 days",
    ],
    image: "/images/subscription/monthly-plans.png",
    alt: "Orange SUV beside a calendar illustration",
    tick: "bg-sky-200 text-sky-900",
    button: "border-ink-900 hover:bg-ink-900 hover:border-ink-900 hover:text-white",
    to: "/cars?sort=price-desc",
  },
];

function PromoContent({ promo }) {
  return (
    <div className="flex h-full min-h-[27rem] flex-col">
      <h2 className="max-w-lg font-display text-2xl font-extrabold leading-tight text-ink-950 sm:text-3xl lg:text-[2.35rem]">
        {promo.title}
      </h2>

      <ul className="mt-5 space-y-3">
        {promo.points.map((point) => (
          <li key={point} className="flex items-center gap-3">
            <span className={cn("grid size-7 shrink-0 place-items-center rounded-full", promo.tick)}>
              <Check size={15} strokeWidth={3} />
            </span>
            <span className="text-sm font-semibold text-ink-800 sm:text-base">{point}</span>
          </li>
        ))}
      </ul>

      <Link
        to={promo.to}
        className={cn(
          "mt-7 inline-flex w-fit items-center gap-1.5 rounded-lg border-2 bg-white px-5 py-3 text-sm font-extrabold text-ink-950 transition-all duration-200 hover:-translate-y-px",
          promo.button,
        )}
      >
        View cars
        <ChevronRight size={16} strokeWidth={3} />
      </Link>

      <img
        src={promo.image}
        alt={promo.alt}
        className="pointer-events-none mt-auto w-full max-w-lg self-end pt-6"
      />
    </div>
  );
}

export default function HeroPromoSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      loop
      autoplay={{ delay: 5200, disableOnInteraction: true }}
      pagination={{ clickable: true }}
      className="!pb-10"
    >
      {promos.map((promo) => (
        <SwiperSlide key={promo.id} className="h-auto">
          <PromoContent promo={promo} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
