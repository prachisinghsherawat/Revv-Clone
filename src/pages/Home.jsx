import Hero from "@/components/home/Hero";
import BrandMarquee from "@/components/home/BrandMarquee";
import Offers from "@/components/home/Offers";
import TopCars from "@/components/home/TopCars";
import Stats from "@/components/home/Stats";
import HowItWorks from "@/components/home/HowItWorks";
import Perks from "@/components/home/Perks";
import Testimonials from "@/components/home/Testimonials";
import FaqPreview from "@/components/home/FaqPreview";
import AppDownload from "@/components/home/AppDownload";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <Offers />
      <TopCars />
      <Stats />
      <HowItWorks />
      <Perks />
      <Testimonials />
      <FaqPreview />
      <AppDownload />
    </>
  );
}
