import Image from "next/image";
import RamenBowlHero from "@/assets/ramen-bowl-hero.png";
import MealPriceTag from "./MealPriceTag";
import { CiShop } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import RestaurantStatus from "./RestaurantStatus";
import { MealManagementMenu } from "./MealManagementMenu";

type Meal = {
  id: string;
  title: string;
  price: string;
  // img: RamenBowlHero;
  rating?: number;
  open?: boolean;
  tag?: string;
};

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="space-y-4 max-w-80 w-full  overflow-hidden bg-white">
      <div className="relative w-full h-65 md:h-70 bg-muted rounded-xl overflow-hidden">
        <Image
          src={RamenBowlHero}
          alt={meal.title}
          fill
          className="object-cover"
        />
        <MealPriceTag className="absolute left-4 top-4" value={20.99} />
      </div>
      <div className="relative flex justify-between gap-2">
        <div className="flex gap-x-4">
          <div>
            <div className="flex items-center justify-center bg-muted size-10 rounded-sm p-1.5">
              <CiShop className="size-full stroke-[0.2] text-muted-foreground " />
            </div>
          </div>
          <div className="space-y-2">
            <h3
              title={meal.title}
              className="font-bold  text-black/90 leading-4 line-clamp-3"
            >
              {meal.title}
            </h3>
            <div className="flex items-center gap-1 text-amber-500">
              <FaStar className="size-3.5 " />
              <span className="leading-3">{meal.rating ?? "0.0"}</span>
            </div>
          </div>
        </div>
        <MealManagementMenu />
      </div>
      <RestaurantStatus open={!!meal.open} />
    </div>
  );
}
