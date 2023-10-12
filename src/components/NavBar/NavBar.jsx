import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import style from "./navBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../redux-toolkit/thunks";

export const NavBar = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllTypes());
	}, [dispatch]);

	const types = useSelector((state) => state.recipes.allTypes);
	const [selectedType, setSelectedType] = useState(null);

	const handleChange = (e) => {
		// console.log(e.value?.name);
		setSelectedType(e.value);
	};

	return (
		<div className={style.container}>
			<div className={`card flex justify-content-center`}>
				<Dropdown
					value={selectedType}
					onChange={handleChange}
					options={types}
					optionLabel="name"
					placeholder="Select a type of diet"
					className={`w-full md:w-14rem `}
					showClear
				/>
			</div>
		</div>
	);
};
