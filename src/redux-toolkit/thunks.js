import { setAllRecipes, setAllTypes, startLoading } from "./recipesSlice";
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