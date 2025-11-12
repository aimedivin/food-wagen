"use client";
import Image from "next/image";
import MealPriceTag from "./MealPriceTag";
import { CiShop } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import RestaurantStatus from "./RestaurantStatus";
import { MealMutationMenu } from "./MealMutationMenu";
import { IMeal } from "@/types";
import MealPlaceholderImage from "@/assets/meal-placeholder.png";
import { useEffect, useState } from "react";
import { isImageUrl } from "@/lib/image";

export default function MealCard({ meal }: { meal: IMeal }) {
  const [validMealImageUrl, setValidMealImageUrl] = useState(false);
  const [validRestaurantLogoUrl, setValidRestaurantLogoUrl] = useState(false);

  useEffect(() => {
    if (meal.image) {
      isImageUrl(meal.image).then(setValidMealImageUrl);
    }
    if (meal.logo) {
      isImageUrl(meal.logo).then(setValidRestaurantLogoUrl);
    }
  }, [meal.image, meal.logo]);

  return (
    <div className="group space-y-4 max-w-80 w-full  overflow-hidden bg-white">
      <div className="relative flex items-center justify-center w-full h-65 md:h-70 bg-muted rounded-xl overflow-hidden">
        {meal.image && validMealImageUrl ? (
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover group-hover:scale-110 duration-300"
            data-testid="food-card-img"
          />
        ) : (
          <div className="relative size-35 flex items-center justify-center   p-1.5">
            <Image
              src={MealPlaceholderImage}
              alt={meal.name}
              fill
              className="object-cover group-hover:scale-110 duration-300"
              data-testid="food-card-img"
            />
          </div>
        )}
        {(meal.price || meal["Price" as keyof typeof meal]) && (
          <MealPriceTag
            className="absolute left-4 top-4"
            value={meal.price ?? meal["Price" as keyof typeof meal]}
          />
        )}
      </div>
      <div className="relative w-full flex justify-between gap-2">
        <div className="flex gap-x-4">
          <div>
            <div className="relative size-10 rounded-sm bg-muted overflow-hidden">
              {meal.logo && validRestaurantLogoUrl ? (
                <Image
                  src={meal.logo}
                  alt={meal.restaurantName ?? ""}
                  fill
                  className="object-cover"
                  data-testid="food-card-img"
                />
              ) : (
                <div className="size-full flex items-center justify-center   p-1.5">
                  <CiShop
                    data-testid="food-card-img"
                    className="size-full stroke-[0.2] text-muted-foreground "
                  />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {meal.name ? (
              <h3
                title={meal.name}
                className="font-bold  wrap-anywhere text-black/90 leading-4 line-clamp-3"
              >
                {meal.name}
              </h3>
            ) : (
              <span className="block rounded-lg px-3 py-0.5 bg-muted text-xs font-medium">
                Food Name Not Specified
              </span>
            )}
            <div className="flex items-center gap-1 text-amber-500">
              <FaStar className="size-3.5 " />
              <span className="leading-3">{meal.rating ?? "0.0"}</span>
            </div>
          </div>
        </div>
        <MealMutationMenu meal={meal}  />
      </div>
      <RestaurantStatus open={!!meal.open} />
    </div>
  );
}
