import { createSlice } from "@reduxjs/toolkit";

export const recipesSlice = createSlice({
   name: "recipes",
   initialState: {
      isLoading: false,
      allRecipes: [],
      auxAllRecipes: [],
      allTypes: [],
      recipeById: {}
   },
   reducers: {
      startLoading: (state) => {
         state.isLoading = true;
      },
      setAllRecipes: (state, action) => {
         state.isLoading = false;
         state.allRecipes = action.payload;
         state.auxAllRecipes = action.payload;
      },
      setAllTypes: (state, action) => {
         state.isLoading = false;
         state.allTypes = action.payload;
      },
      setFilteredByTypes: (state, action) => {
         state.isLoading = false;
         state.allRecipes = action.payload;
      },
      setSortedRecipes: (state, action) => {
         state.isLoading = false;
         state.allRecipes = action.payload;
      },
      setRecipesByName: (state, action) => {
         state.isLoading = false;
         state.allRecipes = action.payload;
      },
      setRecipeById: (state, action) => {
         state.isLoading = false;
         state.recipeById = action.payload;
      }
   }
});

export const {
   startLoading,
   setAllRecipes,
   setAllTypes,
   setFilteredByTypes,
   setSortedRecipes,
   setRecipesByName,
   setRecipeById
} = recipesSlice.actions;