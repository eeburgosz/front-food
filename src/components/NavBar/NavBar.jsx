import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipesByName } from "../../redux-toolkit/thunks";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import style from "./navBar.module.css";
import cooking from "../../assets/cooking.png";

export const NavBar = () => {
	const dispatch = useDispatch();

	const [value, setValue] = useState("");

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValue("");
		dispatch(getRecipesByName(value));
	};

	return (
		<div className={style.container}>
			<div className={style.subcontainer}>
				<img src={cooking} alt="alt" />
				<div className={style.navBar}>
					<form action="" onSubmit={handleSubmit}>
						<InputText
							value={value}
							placeholder="Search"
							type="text"
							className={style.search}
							onChange={handleChange}
						/>
					</form>
					<Link to="/create">
						<Button label="Create" icon="pi pi-plus" className={style.create} />
					</Link>
				</div>
			</div>
		</div>
	);
};
