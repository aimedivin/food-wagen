import { IMeal } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMeals } from "../actions/mealAction";

interface MealState {
  meals: Array<IMeal> | null;
  searchQuery: string;
  page: number;
  loading: boolean;
  error: string | null;
}

const initialState: MealState = {
  meals: null,
  searchQuery: "",
  page: 1,
  loading: false,
  error: null,
};

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    resetMeals: (state) => {
      state.meals = null;
    },
    setPage: (state, action: PayloadAction<{ page?: number }>) => {
      if (action.payload.page) {
        state.page = 1;
      } else {
        state.page++;
      }
    },
    setSearchQuery: (state, action: PayloadAction<{ searchQuery: string }>) => {
      state.searchQuery = action.payload.searchQuery;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMeals.fulfilled,
        (state, action: PayloadAction<Array<IMeal>>) => {
          state.loading = false;
          if (state.meals && state.page > 1) {
            state.meals.push(...action.payload);
          } else {
            state.meals = action.payload;
          }
        }
      )

      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message as string;
        if (action.payload?.status === 404 && state.searchQuery) {
          state.meals = [];
        }
      });
  },
});

export const { setPage, setSearchQuery, resetMeals } = mealsSlice.actions;
export default mealsSlice.reducer;
