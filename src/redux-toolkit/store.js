import { configureStore } from "@reduxjs/toolkit";
import { recipesSlice } from "./recipesSlice";

export const store = configureStore({
   reducer: {
      recipes: recipesSlice.reducer
   }
});