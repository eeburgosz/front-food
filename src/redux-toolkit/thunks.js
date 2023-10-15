import { filterByType, sortingRecipes } from "../utils/filters";
import { setAllRecipes, setAllTypes, setFilteredByTypes, setRecipeById, setRecipesByName, setSortedRecipes, startLoading } from "./recipesSlice";
import axios from 'axios';

export const getAllRecipes = () => {
   return async (dispatch) => {
      dispatch(startLoading());
      const { data } = await axios.get("https://backfood-d7cg.onrender.com/recipes");
      dispatch(setAllRecipes(data));
   };
};

export const getAllTypes = () => {
   return async (dispatch) => {
      dispatch(startLoading());
      const { data } = await axios.get("https://backfood-d7cg.onrender.com/types");
      dispatch(setAllTypes(data));
   };
};

export const filterByTypes = (payload) => {
   return async (dispatch, getState) => {
      dispatch(startLoading(true));
      const { auxAllRecipes } = getState().recipes;
      const type = payload?.name || null;
      const data = filterByType(type, auxAllRecipes);
      dispatch(setFilteredByTypes(data));
   };
};

export const sortRecipes = (selectedSort, selectedScore) => {
   return async (dispatch, getState) => {
      const { allRecipes } = getState().recipes;
      const sort = selectedSort?.name || null;
      const score = selectedScore?.name || null;
      const data = sortingRecipes(score, sort, allRecipes);
      dispatch(setSortedRecipes(data));
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
      }
   };
};