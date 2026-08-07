import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Rating from "@/components/ui/Rating";
import { testimonials } from "@/data/content";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Happy customers"
        title="2.1 lakh trips, and counting"
        description="Reviews collected from customers after their car was returned."
      />

      <Reveal className="mt-10" delay={0.05}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1.05}
          autoplay={{ delay: 4200, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="!pb-12"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.name} className="h-auto">
              <figure className="card-surface flex h-full min-h-56 flex-col p-7">
                <Quote size={26} className="text-brand-200" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                  {item.body}
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-ink-100 pt-5">
                  <div>
                    <p className="text-sm font-bold text-ink-950">{item.name}</p>
                    <p className="text-xs font-semibold text-ink-400">{item.city}</p>
                  </div>
                  <Rating value={item.rating} size={13} showValue={false} />
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  );
}
