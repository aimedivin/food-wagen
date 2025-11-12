"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button } from "../ui/button";
import MealCard from "./MealCard";
import { useEffect, useState } from "react";
import { fetchMeals } from "@/store/actions/mealAction";
import MealCardLoadingSkeleton from "./MealCardLoadingSkeleton";
import { setPage } from "@/store/slices/mealsSlice";

export const MEALS_LIMIT_PER_PAGE = 8;

export default function FeaturedMeals() {
  const { page, loading, meals } = useAppSelector((state) => state.meals);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!meals) {
      dispatch(
        fetchMeals({
          page: page,
          limit: MEALS_LIMIT_PER_PAGE,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (meals && page > 1 && meals.length % 8 == 0) {
      dispatch(
        fetchMeals({
          page: page,
          limit: MEALS_LIMIT_PER_PAGE,
        })
      );
    }
  }, [page]);

  const handleLoadMore = () => {
    if (meals && meals.length % 8 == 0) {
      dispatch(setPage({}));
    }
  };

  return (
    <section
      className="w-full px-[5%]"
      data-testid="food-feature-meals-section"
    >
      <div className="mx-auto max-w-6xl  py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center">
          Featured Meals
        </h2>
        <div className="relative mt-8 grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-15 md:gap-y-12 gap-x-5 min-h-60">
          {meals &&
            meals?.length > 0 &&
            meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}

          {loading &&
            Array.from({ length: 4 }, (_, index) => (
              <MealCardLoadingSkeleton key={index} />
            ))}
          {!meals?.length && !loading && (
            <p className="absolute inset-0 m-auto size-fit text-muted-foreground">
              No items available
            </p>
          )}
        </div>
        {meals && meals.length > 0 && meals.length % 8 == 0 && (
          <div className="mt-16 flex justify-center">
            <Button
              onClick={handleLoadMore}
              className="food-btn-primary px-5 py-2 text-sm"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
