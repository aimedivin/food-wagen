"use client";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMeals } from "@/store/actions/mealAction";
import { MEALS_LIMIT_PER_PAGE } from "./FeaturedMeals";
import { setSearchQuery } from "@/store/slices/mealsSlice";
import { Spinner } from "../ui/spinner";

const SearchMeal = () => {
  const { loading, meals, searchQuery } = useAppSelector(
    (state) => state.meals
  );
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFindMeal = () => {
    if (meals && searchQuery) {
      dispatch(
        fetchMeals({
          page: 1,
          limit: MEALS_LIMIT_PER_PAGE,
          searchQuery,
        })
      );
    }
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        handleFindMeal();
      }}
      className="w-full flex flex-wrap sm:flex-nowrap sm:items-center  gap-2 p-4 md:p-6"
    >
      <div className="relative flex-1 min-w-60  h-12 sm:h-13">
        <CiSearch className="absolute inset-0 left-3 my-auto text-primary size-4.5 stroke-1" />
        <Input
          ref={inputRef}
          type="search"
          className="size-full pl-9 py-2 rounded-sm  outline-none!"
          placeholder="What do you like to eat today?"
          value={searchQuery}
          onChange={(e) => {
            if (e.target.value === "") {
              dispatch(
                fetchMeals({
                  page: 1,
                  limit: MEALS_LIMIT_PER_PAGE,
                })
              );
            }
            dispatch(setSearchQuery({ searchQuery: e.target.value }));
          }}
        />
      </div>
      <Button
        disabled={loading}
        className="food-btn-find h-11.5 sm:h-13 w-40! duration-1000!"
        onClick={() => inputRef.current?.focus()}
      >
        {loading && searchQuery ? (
          <Spinner className="size-4" />
        ) : (
          <FaSearch className="size-3.5" />
        )}
        {loading && searchQuery ? "Finding Food..." : "Find Food"}
      </Button>
    </form>
  );
};

export default SearchMeal;
