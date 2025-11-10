import Image from "next/image";
import { Button } from "@/components/ui/button";
import RamenBowlHero from "@/assets/ramen-bowl-hero.png";
import { FaMotorcycle, FaSearch, FaShoppingBag } from "react-icons/fa";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

export default function Hero() {
  return (
    <section className="w-full bg-[#FFB30E] overflow-hidden px-[5%]">
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
            <form
              action=""
              className="w-full flex flex-wrap sm:flex-nowrap sm:items-center  gap-2 p-4 md:p-6"
            >
              <div className="relative flex-1 min-w-60  h-11 md:h-13">
                <CiSearch className="absolute inset-0 left-3 my-auto text-primary size-4.5 stroke-1" />
                <Input
                  className="size-full pl-9 py-2 rounded-md ring-0! outline-none!  "
                  placeholder="What do you like to eat today?"
                />
              </div>
              <Button className="food-btn-find h-11 md:h-13 ">
                <FaSearch className="size-3.5" />
                Find Food
              </Button>
            </form>
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
