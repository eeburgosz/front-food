import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import style from "./cardsContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux-toolkit/thunks";
import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";

export const CardsContainer = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllRecipes());
	}, [dispatch]);
	const data = useSelector((state) => state.recipes.allRecipes);

	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(9);

	const filteredRecipes = () => {
		return data.slice(first, first + 9);
	};

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	return (
		<div>
			{filteredRecipes().map((d) => (
				<div className={style.container} key={d.id}>
					<img src={d.img} alt={d.name} />
					<div className={style.subcontainer}>
						<h4>{d.name}</h4>
						<p>
							{d.Types.map((type, index) => (
								<span key={type.id}>
									<em>
										{type.name}
										{index < d.Types.length - 1 ? ", " : ""}
									</em>
								</span>
							))}
						</p>
					</div>
					<Link to={`/recipes/${d.id}`}>
						<Button label="View" icon="pi pi-eye" />
					</Link>
				</div>
			))}
			<div className="card">
				<Paginator
					first={first}
					rows={rows}
					totalRecords={data.length}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
};
