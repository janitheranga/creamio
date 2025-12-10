import HeroSection from "@/app/components/sections/HeroSection";
import CategoriesLoopSection from "@/app/components/sections/CategoriesLoopSection";
import TopCategoriesSection from "@/app/components/sections/TopCategoriesSection";
import FlashSalesSection from "@/app/components/sections/FlashSalesSection";
import ServicesLoopSection from "@/app/components/sections/ServicesLoopSection";
import BestSellingSection from "@/app/components/sections/BestSellingSection";
import ReviewsLoopSection from "@/app/components/sections/ReviewsLoopSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesLoopSection />
      <TopCategoriesSection />
      <FlashSalesSection />
      <ServicesLoopSection />
      <BestSellingSection />
      <ReviewsLoopSection />
    </>
  );
}
