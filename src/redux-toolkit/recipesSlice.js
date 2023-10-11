import { createSlice } from "@reduxjs/toolkit";

export const recipesSlice = createSlice({
   name: "recipes",
   initialState: {
      isLoading: false,
      allRecipes: [],
      auxAllRecipes: [],
      allTypes: []
   },
   reducers: {
      startLoading: (state) => {
         state.startLoading = true;
      },
      setAllRecipes: (state, action) => {
         state.isLoading = false;
         state.allRecipes = action.payload;
         state.auxAllRecipes = action.payload;
      },
      setAllTypes: (state, action) => {
         state.isLoading = false;
         state.allTypes = action.payload;
      }
   }
});

export const {
   startLoading,
   setAllRecipes,
   setAllTypes
} = recipesSlice.actions;