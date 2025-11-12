"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import {
  getMealFormErrorMessage,
  type MealFormData,
} from "@/lib/formValidation";
import { useAppDispatch, useAppSelector } from "@/store";
import { addNewMeal, fetchMeals, updateMeal } from "@/store/actions/mealAction";
import { useEffect } from "react";
import { resetMealMutation } from "@/store/slices/mealMutationSlice";
import { Spinner } from "../ui/spinner";
import { useMutateMeal } from "@/context/MutateMealContext";
import { toast } from "sonner";
import { MEALS_LIMIT_PER_PAGE } from "./FeaturedMeals";
import { resetMeals } from "@/store/slices/mealsSlice";
import { mealFormSchema } from "@/lib/validations/meal.shema";

export function AddEditMealForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange", // Re-validate on change
    defaultValues: {
      food_name: "",
      food_rating: 0,
      food_price: 0,
      food_image: "",
      restaurant_name: "",
      restaurant_logo: "",
      restaurant_status: "open",
    },
  });

  const { loading, success, error } = useAppSelector(
    (state) => state.mealMutation
  );
  const { page, searchQuery } = useAppSelector((state) => state.meals);
  const { selectedMeal } = useAppSelector((state) => state.mealMutation);
  const dispatch = useAppDispatch();

  const { mode } = useMutateMeal();

  // Pre-populate the form fields when editing,
  useEffect(() => {
    if (mode === "edit" && selectedMeal) {
      reset({
        food_name: selectedMeal.name || "",
        food_rating: selectedMeal.rating || 0,
        food_price: Number(selectedMeal.price) || 0,
        food_image: selectedMeal.image || "",
        restaurant_name: selectedMeal.restaurantName || "",
        restaurant_logo: selectedMeal.logo || "",
        restaurant_status: selectedMeal.open ? "open" : "closed",
      });
    }
  }, [selectedMeal]);

  // Check result after dispatching add/update meal actions
  useEffect(() => {
    if (success) {
      toast.success(
        `Meal ${mode == "add" ? "added" : "updated"} successfully!`
      );
      dispatch(resetMeals());
      dispatch(
        fetchMeals({
          limit: MEALS_LIMIT_PER_PAGE * page,
          page: 1,
          searchQuery,
        })
      );
      dispatch(resetMealMutation());
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to save the meal. Please try again.");
      dispatch(resetMealMutation());
    }
  }, [dispatch, error]);

  const onSubmit = async (data: MealFormData) => {
    // API Calling to handle new meal creation
    if (mode == "add") {
      dispatch(
        addNewMeal({
          name: data.food_name,
          avatar: data.food_image,
          rating: data.food_rating,
          open: data.restaurant_status === "open",
          logo: data.restaurant_logo,
          price: data.food_price.toString(),
          image: data.food_image,
          restaurantName: data.restaurant_name,
        })
      );
    } else if (mode == "edit" && selectedMeal) {
      dispatch(
        updateMeal({
          id: selectedMeal.id,
          name: data.food_name,
          avatar: data.food_image,
          rating: data.food_rating,
          open: data.restaurant_status === "open",
          logo: data.restaurant_logo,
          price: data.food_price.toString(),
          image: data.food_image,
          restaurantName: data.restaurant_name,
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3">
        {/* Food Name */}
        <div className="grid gap-1">
          <Label htmlFor="food_name">Food Name</Label>
          <Input
            type="text"
            id="food_name"
            {...register("food_name", {
              onChange: () => trigger("food_name"),
            })}
            placeholder="Enter food name"
            className={cn("", errors.food_name && "aria-invalid")}
            aria-invalid={!!errors.food_name}
            aria-describedby={errors.food_name ? "food-name-error" : undefined}
          />
          {errors.food_name && (
            <span
              id="food-name-error"
              className="text-sm text-destructive -mt-1"
            >
              {getMealFormErrorMessage("food_name", errors)}
            </span>
          )}
        </div>

        {/* Food Rating */}
        <div className="grid gap-1">
          <Label htmlFor="food_rating">Food Rating</Label>
          <Input
            type="number"
            min={1}
            max={5}
            step={1}
            id="food_rating"
            {...register("food_rating", {
              valueAsNumber: true,
              onChange: () => trigger("food_rating"),
            })}
            placeholder="Food rating (1-5)"
            className={cn("", errors.food_rating && "aria-invalid")}
            aria-invalid={!!errors.food_rating}
            aria-describedby={
              errors.food_rating ? "food-rating-error" : undefined
            }
          />
          {errors.food_rating && (
            <span
              id="food-rating-error"
              className="text-sm text-destructive -mt-1"
            >
              {getMealFormErrorMessage("food_rating", errors)}
            </span>
          )}
        </div>

        {/* Food Price */}
        <div className="grid gap-1">
          <Label htmlFor="food_price">Food Price</Label>
          <Input
            type="number"
            min={0.01}
            step={0.01}
            id="food_price"
            {...register("food_price", {
              valueAsNumber: true,
              onChange: () => trigger("food_price"),
            })}
            placeholder="Food price ($)"
            className={cn("", errors.food_price && "aria-invalid")}
            aria-invalid={!!errors.food_price}
            aria-describedby={
              errors.food_price ? "food-price-error" : undefined
            }
          />
          {errors.food_price && (
            <span
              id="food-price-error"
              className="text-sm text-destructive -mt-1"
            >
              {getMealFormErrorMessage("food_price", errors)}
            </span>
          )}
        </div>

        {/* Food Image URL */}
        <div className="grid gap-1">
          <Label htmlFor="food_image">Food Image (link)</Label>
          <Input
            type="text"
            id="food_image"
            {...register("food_image", {
              onChange: () => trigger("food_image"),
            })}
            placeholder="Enter food image URL"
            className={cn("", errors.food_image && "aria-invalid")}
            aria-invalid={!!errors.food_image}
            aria-describedby={
              errors.food_image ? "food-image-error" : undefined
            }
          />
          {errors.food_image && (
            <span
              id="food-image-error"
              className="text-sm text-destructive -mt-1"
            >
              {getMealFormErrorMessage("food_image", errors)}
            </span>
          )}
        </div>

        {/* Restaurant Name */}
        <div className="grid gap-1">
          <Label htmlFor="restaurant_name">Restaurant Name</Label>
          <Input
            type="text"
            id="restaurant_name"
            {...register("restaurant_name", {
              onChange: () => trigger("restaurant_name"),
            })}
            placeholder="Enter restaurant name"
            className={cn("", errors.restaurant_name && "aria-invalid")}
            aria-invalid={!!errors.restaurant_name}
            aria-describedby={
              errors.restaurant_name ? "restaurant-name-error" : undefined
            }
          />
          {errors.restaurant_name && (
            <span
              id="restaurant-name-error"
              className="text-sm text-destructive -mt-1"
            >
              {getMealFormErrorMessage("restaurant_name", errors)}
            </span>
          )}
        </div>

        {/* Restaurant Logo URL */}
        <div className="grid gap-1">
          <Label htmlFor="restaurant_logo">Restaurant Logo (link)</Label>
          <Input
            type="text"
            id="restaurant_logo"
            {...register("restaurant_logo", {
              onChange: () => trigger("restaurant_logo"),
            })}
            placeholder="Enter restaurant logo URL"
            className={cn("", errors.restaurant_logo && "aria-invalid")}
            aria-invalid={!!errors.restaurant_logo}
            aria-describedby={
              errors.restaurant_logo ? "restaurant-logo-error" : undefined
            }
          />
          {errors.restaurant_logo && (
            <span
              id="restaurant-logo-error"
              className="text-sm text-destructive -mt-1"
            >
              {getMealFormErrorMessage("restaurant_logo", errors)}
            </span>
          )}
        </div>

        {/* Restaurant Status */}
        <div className="grid gap-1">
          <Label htmlFor="restaurant_status">Restaurant Status</Label>
          <select
            id="restaurant_status"
            {...register("restaurant_status", {
              onChange: () => trigger("restaurant_status"),
            })}
            className={cn(
              "text-sm h-10.5 w-full min-w-0 rounded-sm bg-muted px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
              errors.restaurant_status &&
                "aria-invalid border-destructive ring-destructive"
            )}
            aria-invalid={!!errors.restaurant_status}
            aria-describedby={
              errors.restaurant_status ? "restaurant-status-error" : undefined
            }
          >
            <option value="open">Open Now</option>
            <option value="closed">Closed</option>
          </select>
          {errors.restaurant_status && (
            <span
              id="restaurant-status-error"
              className="text-sm text-destructive -mt-1"
            >
              {getMealFormErrorMessage("restaurant_status", errors)}
            </span>
          )}
        </div>
      </div>
      <DialogFooter className="mt-8">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 food-btn-primary text-base! h-11!"
          data-testid="food-add_update-btn"
        >
          {loading && <Spinner className="size-4" />}

          {!loading && mode == "add" && "Add Meal"}
          {loading && mode == "add" && "Adding Meal..."}

          {!loading && mode == "edit" && "Update Meal"}
          {loading && mode == "edit" && "Updating Meal..."}
        </Button>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="flex-1 border-primary text-base! h-11! hover:bg-primary/10!"
          >
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
