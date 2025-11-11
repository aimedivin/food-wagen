import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { addNewMeal, deleteMeal, updateMeal } from "../actions/mealAction";
import { IMeal } from "@/types";

interface IMealMutationState {
  selectedMeal: IMeal | null;
  success: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: IMealMutationState = {
  success: false,
  loading: false,
  error: null,
  selectedMeal: null,
};

const mealMutationSlice = createSlice({
  name: "meal-mutation",
  initialState,
  reducers: {
    reset: () => initialState,
    setSelectedMeal: (state, action: PayloadAction<IMeal>) => {
      if (action.payload) {
        state.selectedMeal = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          updateMeal.fulfilled,
          deleteMeal.fulfilled,
          addNewMeal.fulfilled
        ),
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.success = true;
        }
      )
      .addMatcher(
        isAnyOf(updateMeal.pending, deleteMeal.pending, addNewMeal.pending),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(updateMeal.rejected, deleteMeal.rejected, addNewMeal.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message as string;
          state.success = false;
        }
      );
  },
});

export const { reset: resetMealMutation, setSelectedMeal } =
  mealMutationSlice.actions;
export default mealMutationSlice.reducer;
