import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import {
	filterByTypes,
	getAllTypes,
	sortRecipes,
} from "../../redux-toolkit/thunks";
import { Button } from "primereact/button";
import style from "./Filters.module.css";

export const Filters = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllTypes());
	}, [dispatch]);

	const types = useSelector((state) => state.recipes.allTypes);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedScore, setselectedScore] = useState(null);
	const [selectedSort, setSelectedSort] = useState(null);

	const score = [{ name: "min-max" }, { name: "max-min" }];
	const sort = [{ name: "A-Z" }, { name: "Z-A" }];

	const handleTypeChange = (e) => {
		setSelectedType(e.value);
	};

	const handleScoreChange = (e) => {
		setselectedScore(e.value);
	};

	const handleSortChange = (e) => {
		setSelectedSort(e.value);
	};

	useEffect(() => {
		dispatch(filterByTypes(selectedType));
		dispatch(sortRecipes(selectedSort, selectedScore));
	}, [dispatch, selectedType, selectedScore, selectedSort]);

	const location = useLocation();
	const navigate = useNavigate();
	const handleRefresh = () => {
		location.pathname === "/recipes"
			? window.location.reload()
			: navigate("/recipes");
	};

	return (
		<div className={style.body}>
			<div className={style.container}>
				<div className={`card flex justify-content-center`}>
					<div className={style.dropdown}>
						<label htmlFor="diet">
							<strong>Diets</strong>
						</label>
						<Dropdown
							id="diet"
							value={selectedType}
							onChange={handleTypeChange}
							options={types}
							optionLabel="name"
							placeholder="All Types"
							className={`w-full md:w-14rem `}
							showClear
						/>
					</div>
				</div>
				<div className={`card flex justify-content-center`}>
					<div className={style.dropdown}>
						<label htmlFor="sort">
							<strong>Sort</strong>
						</label>
						<Dropdown
							id="sort"
							value={selectedSort}
							onChange={handleSortChange}
							options={sort}
							optionLabel="name"
							placeholder="All Recipes"
							className={`w-full md:w-14rem `}
							showClear
						/>
					</div>
				</div>
				<div className={`card flex justify-content-center`}>
					<div className={style.dropdown}>
						<label htmlFor="score">
							<strong>Score</strong>
						</label>
						<Dropdown
							id="score"
							value={selectedScore}
							onChange={handleScoreChange}
							options={score}
							optionLabel="name"
							placeholder="All Scores"
							className={`w-full md:w-14rem `}
							showClear
						/>
					</div>
				</div>
			</div>
			<Button label="Show all recipes" onClick={handleRefresh} />
		</div>
	);
};
