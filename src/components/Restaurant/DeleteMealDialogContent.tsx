"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteMeal, fetchMeals } from "@/store/actions/mealAction";
import { resetMealMutation } from "@/store/slices/mealMutationSlice";
import { useEffect } from "react";
import { MEALS_LIMIT_PER_PAGE } from "./FeaturedMeals";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { resetMeals } from "@/store/slices/mealsSlice";

export function DeleteMealDialogContent() {
  const { error, loading, success, selectedMeal } = useAppSelector(
    (state) => state.mealMutation
  );

  const { page, searchQuery } = useAppSelector((state) => state.meals);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      toast.success("Meal deleted successfully!");
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
      toast.error("Failed to delete the meal. Please try again.");
      dispatch(resetMealMutation());
    }
  }, [dispatch, error]);

  const handleMealDelete = () => {
    if (selectedMeal) dispatch(deleteMeal({ id: selectedMeal.id }));
  };
  return (
    <>
      <div className="grid gap-5 text-muted-foreground">
        <p>
          Are you sure you want to delete this meal? Actions cannot be reversed.
        </p>
      </div>
      <DialogFooter className="mt-3">
        <Button
          type="button"
          className="flex-1 food-btn-primary text-base! h-11!"
          onClick={handleMealDelete}
          disabled={loading}
        >
          {loading && <Spinner className="size-4" />}
          {loading ? "Deleting Meal..." : "Delete Meal"}
        </Button>
        <DialogClose asChild>
          <Button
            variant="outline"
            className="flex-1 border-primary text-base! h-11! hover:bg-primary/10!"
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
