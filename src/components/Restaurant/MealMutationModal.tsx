"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { resetMealMutation } from "@/store/slices/mealMutationSlice";
import { useMutateMeal } from "@/context/MutateMealContext";
import { useAppDispatch, useAppSelector } from "@/store";
import { DeleteMealDialogContent } from "./DeleteMealDialogContent";
import { AddEditMealForm } from "./AddEditMealForm";

export function MealMutationModal() {
  const { selectedMeal } = useAppSelector((state) => state.mealMutation);
  const { isDialogOpen, setIsDialogOpen, mode, setMode } = useMutateMeal();

  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={
        isDialogOpen &&
        !!mode &&
        (mode != "add" && !selectedMeal ? false : true)
      }
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          dispatch(resetMealMutation());
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-135 px-[5%] py-[6%] sm:py-[3%]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">
            {mode == "add" && "Add Meal"}
            {mode == "edit" && "Update Meal"}
            {mode == "delete" && "Delete Meal"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {mode === "delete" ? <DeleteMealDialogContent /> : <AddEditMealForm />}
      </DialogContent>
    </Dialog>
  );
}
