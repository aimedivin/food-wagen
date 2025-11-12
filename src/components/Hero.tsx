import Image from "next/image";
import { Button } from "@/components/ui/button";
import RamenBowlHero from "@/assets/ramen-bowl-hero.png";
import { FaMotorcycle, FaShoppingBag } from "react-icons/fa";
import SearchMeal from "./Restaurant/SearchMeal";

export default function Hero() {
  return (
    <section
      className="w-full bg-[#FFB30E] overflow-hidden px-[5%]"
      data-testid="food-hero-section"
    >
      <div className="relative mx-auto max-w-6xl  py-14 md:py-20 flex gap-15 items-center">
        <div className="space-y-6  w-full max-w-xl lg:flex-3/5 z-20">
          <div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
              Are you starving?
            </h1>
            <p className="text-white text-lg md:text-xl">
              Within a few clicks, find meals that are accessible near you.
            </p>
          </div>

          <div className="bg-background rounded-lg flex flex-col shadow-lg">
            <div className=" flex gap-2 p-4 md:p-6 border-b border-border/70">
              <Button className="bg-primary/10 hover:bg-primary/20! text-primary font-bold! px-5! rounded-sm!">
                <FaMotorcycle strokeWidth={2.5} />
                Delivery
              </Button>
              <Button
                variant="ghost"
                className="hover:bg-primary/20! hover:text-primary! text-muted-foreground font-bold! px-5! rounded-sm!"
              >
                <FaShoppingBag strokeWidth={2.5} />
                Pickup
              </Button>
            </div>
            <SearchMeal />
          </div>
        </div>
        <Image
          src={RamenBowlHero}
          alt="ramen-bowl"
          // fill
          priority
          className="absolute size-85! md:size-100! object-cover -right-20 md:right-0 -bottom-20 drop-shadow-[-40px_25px_30px_rgba(0,0,0,0.4)]"
        />
      </div>
    </section>
  );
}
