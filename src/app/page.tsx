import Navbar from "@/components/Header/Navbar";
import Hero from "@/components/Hero";
import FeaturedMeals from "@/components/Restaurant/FeaturedMeals";
import Footer from "@/components/Footer";
import { MealMutationModal } from "@/components/Restaurant/MealMutationModal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="space-y-5">
        <Hero />
        <MealMutationModal />
        <FeaturedMeals />
        <Footer />
      </div>
    </main>
  );
}
