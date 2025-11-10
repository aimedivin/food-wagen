import Navbar from "@/components/Header/Navbar";
import Hero from "@/components/Hero";
import FeaturedMeals from "@/components/Restaurant/FeaturedMeals";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="space-y-5">
        <Hero />
        <FeaturedMeals />
        <Footer />
      </div>
    </main>
  );
}
