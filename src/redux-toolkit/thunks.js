import { filterByType, getDishTypes, sortingRecipes } from "../utils/filters";
import { setAllDishTypes, setAllRecipes, setAllTypes, setFilteredByTypes, setRecipeById, setRecipesByName, setSortedRecipes, startLoading } from "./recipesSlice";
import axios from 'axios';

export const getAllRecipes = () => {
   return async (dispatch) => {
      dispatch(startLoading());
      try {
         const { data } = await axios.get("https://backfood-d7cg.onrender.com/recipes");
         dispatch(setAllRecipes(data));
      } catch (error) {
         dispatch(setAllRecipes([]));
         throw new Error({ message: error.message });
      }
   };
};

export const getAllTypes = () => {
   return async (dispatch) => {
      dispatch(startLoading());
      try {
         const { data } = await axios.get("https://backfood-d7cg.onrender.com/types");
         dispatch(setAllTypes(data));
      } catch (error) {
         dispatch(setAllTypes([]));
         throw new Error({ message: error.message });
      }
   };
};

export const filterByTypes = (payload) => {
   return async (dispatch, getState) => {
      dispatch(startLoading());
      try {
         const { auxAllRecipes } = getState().recipes;
         const type = payload?.name || null;
         const data = filterByType(type, auxAllRecipes);
         dispatch(setFilteredByTypes(data));
      } catch (error) {
         dispatch(setFilteredByTypes([]));
         throw new Error({ message: error.message });
      }
   };
};

export const sortRecipes = (selectedSort, selectedScore) => {
   return async (dispatch, getState) => {
      dispatch(startLoading());
      try {
         const { allRecipes } = getState().recipes;
         const sort = selectedSort?.name || null;
         const score = selectedScore?.name || null;
         const data = sortingRecipes(score, sort, allRecipes);
         dispatch(setSortedRecipes(data));
      } catch (error) {
         dispatch(setSortedRecipes([]));
         throw new Error({ message: error.message });
      }
   };
};

export const getRecipesByName = (value) => {
   return async (dispatch) => {
      dispatch(startLoading());
      try {
         const { data } = await axios.get(`https://backfood-d7cg.onrender.com/recipes?name=${value}`);
         dispatch(setRecipesByName(data));
      } catch (error) {
         dispatch(setRecipesByName([]));
         throw new Error({ message: error.message });
      }
   };
};

export const getRecipeById = (id) => {
   return async (dispatch) => {
      dispatch(startLoading());
      try {
         const { data } = await axios.get(`https://backfood-d7cg.onrender.com/recipes/${id}`);
         dispatch(setRecipeById(data));
      } catch (error) {
         dispatch(setRecipeById({}));
         throw new Error({ message: error.message });
      }
   };
};

export const getAllDishTypes = () => {
   return async (dispatch, getState) => {
      dispatch(startLoading());
      try {
         const { auxAllRecipes } = getState().recipes;
         const allDishTypes = getDishTypes(auxAllRecipes);
         dispatch(setAllDishTypes(allDishTypes));
      } catch (error) {
         dispatch(setAllDishTypes([]));
         throw new Error({ message: error.message });
      }
   };
};

export const postNewRecipe = (payload) => {
   return async (dispatch) => {
      dispatch(startLoading());
      console.log(payload);
   };
};