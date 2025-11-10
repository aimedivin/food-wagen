"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import {
  getMealFormErrorMessage,
  type MealFormData,
} from "@/lib/formValidation";

// Zod validation schema
const mealFormSchema = z.object({
  food_name: z.string().min(1, "Food Name is required"),
  food_rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  food_price: z
    .number()
    .min(0.01, "Food Price must be greater than 0")
    .positive("Food Price must be a positive number"),
  food_image: z
    .string()
    .min(1, "Food Image URL is required")
    .url("Food Image must be a valid URL"),
  restaurant_name: z.string().min(1, "Restaurant Name is required"),
  restaurant_logo: z
    .string()
    .min(1, "Restaurant Logo URL is required")
    .url("Restaurant Logo must be a valid URL"),
  restaurant_status: z.enum(["open", "closed"]),
});

export function AddEditMealDialog({
  mode = "add",
  isOpen,
  setIsOpen,
}: {
  mode?: "add" | "edit";
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  // Use controlled or uncontrolled open state depending on mode
  const dialogProps =
    mode === "edit" && isOpen !== undefined && setIsOpen
      ? { open: isOpen, onOpenChange: setIsOpen }
      : {};

  const onSubmit = async (data: MealFormData) => {
    // TODO: Replace with actual API call
    // Example: await api.post('/meals', data);
    console.log("Form submitted:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Reset form after successful submission
    reset({
      food_name: "",
      food_rating: 0,
      food_price: 0,
      food_image: "",
      restaurant_name: "",
      restaurant_logo: "",
      restaurant_status: "open",
    });

    // Close dialog
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog {...dialogProps}>
      {mode === "add" && (
        <DialogTrigger asChild>
          <Button className="food-btn-primary" size="sm">
            Add Meal
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-135 px-[5%] py-[6%] sm:py-[3%]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">
            {mode === "add" ? "Add a meal" : "Edit Meal"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
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
                aria-describedby={
                  errors.food_name ? "food-name-error" : undefined
                }
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
                  errors.restaurant_status
                    ? "restaurant-status-error"
                    : undefined
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
              disabled={isSubmitting}
              className="flex-1 food-btn-primary text-base! h-10.5!"
            >
              {isSubmitting
                ? "Submitting..."
                : mode === "add"
                ? "Add Meal"
                : "Update Meal"}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                className="flex-1 border-primary text-base! h-10.5! hover:bg-primary/10!"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
