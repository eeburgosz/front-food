import { filterByType, sortingRecipes } from "../utils/filters";
import {
	setAllRecipes,
	setAllTypes,
	setFilteredByTypes,
	setRecipeById,
	setRecipesByName,
	setSortedRecipes,
	startLoading,
} from "./recipesSlice";
import axios from "axios";

const URL = "https://backfood-nxl1.onrender.com";

export const getAllRecipes = () => {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const { data } = await axios.get(`${URL}/recipes`);
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
			const { data } = await axios.get(`${URL}/types`);
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
			const { data } = await axios.get(`${URL}/recipes?name=${value}`);
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
			const { data } = await axios.get(`${URL}/recipes/${id}`);
			dispatch(setRecipeById(data));
		} catch (error) {
			throw new Error({ message: error.message });
		}
	};
};

export const postNewRecipe = (payload) => {
	return async (dispatch) => {
		dispatch(startLoading());
		const {
			name,
			img,
			summary,
			stepByStep,
			dishTypes,
			types,
			score,
			healthScore,
		} = payload;
		try {
			const postData = {
				name,
				img,
				summary,
				stepByStep,
				dishTypes,
				types,
				score,
				healthScore,
			};
			await axios.post(`${URL}/recipe`, postData);
		} catch (error) {
			throw new Error({ message: error.message });
		}
	};
};
