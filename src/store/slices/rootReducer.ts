import { combineReducers } from "@reduxjs/toolkit";

const sessionPersistConfig = {
  key: "auth",
  storage: sessionStorage,
};

const rootReducer = combineReducers({});
export default rootReducer;
