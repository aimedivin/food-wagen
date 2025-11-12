import { combineReducers } from "@reduxjs/toolkit";
import mealsReducer from "./mealsSlice";
import mealMutationReducer from "./mealMutationSlice";

const rootReducer = combineReducers({
  meals: mealsReducer,
  mealMutation: mealMutationReducer,
});

export default rootReducer;
