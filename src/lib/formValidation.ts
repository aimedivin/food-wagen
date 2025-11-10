import { FieldErrors } from "react-hook-form";

// Type for meal form data
export type MealFormData = {
  food_name: string;
  food_rating: number;
  food_price: number;
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: "open" | "closed";
};

export function getMealFormErrorMessage(
  field: keyof MealFormData,
  errors: FieldErrors<MealFormData>
): string | undefined {
  const error = errors[field];
  if (!error) return undefined;

  // Custom error messages based on field
  if (field === "food_name" && error.message?.includes("required")) {
    return "Food Name is required";
  } else if (field === "food_rating") {
    if (error.message?.includes("number") || error.message?.includes("NaN")) {
      return "Food Rating must be a number";
    }
    return error.message;
  } else if (field === "food_price") {
    if (error.message?.includes("number") || error.message?.includes("NaN")) {
      return "Food Price must be a number";
    } else if (error.message?.includes("required")) {
      return "Food Price is required";
    }
    return error.message;
  } else if (field === "food_image") {
    if (error.message?.includes("required")) {
      return "Food Image URL is required";
    } else if (error.message?.includes("URL")) {
      return "Food Image must be a valid URL";
    }
    return error.message;
  } else if (
    field === "restaurant_name" &&
    error.message?.includes("required")
  ) {
    return "Restaurant Name is required";
  } else if (field === "restaurant_logo") {
    if (error.message?.includes("required")) {
      return "Restaurant Logo URL is required";
    } else if (error.message?.includes("URL")) {
      return "Restaurant Logo must be a valid URL";
    }
    return error.message;
  } else if (field === "restaurant_status") {
    return "Restaurant Status must be 'Open Now' or 'Closed'";
  }

  return error.message;
}
