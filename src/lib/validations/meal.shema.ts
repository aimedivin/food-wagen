import { z } from "zod";

export const mealFormSchema = z.object({
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
