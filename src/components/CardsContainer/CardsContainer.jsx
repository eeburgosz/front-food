import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import style from "./cardsContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux-toolkit/thunks";
import { Paginator } from "primereact/paginator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";

const skeletons = [];
for (let i = 0; i < 5; i++) {
	skeletons.push(<Skeleton key={i} className={style.skeleton}></Skeleton>);
}

export const CardsContainer = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllRecipes());
	}, [dispatch]);
	const data = useSelector((state) => state.recipes.allRecipes);
	//!
	const { isLoading } = useSelector((state) => state.recipes);

	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(9);

	const filteredRecipes = () => {
		return data.slice(first, first + 9);
	};

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	const location = useLocation();
	const navigate = useNavigate();
	const handleRefresh = () => {
		location.pathname === "/recipes"
			? window.location.reload()
			: navigate("/recipes");
	};

	return (
		<div>
			{isLoading ? (
				<>{skeletons}</>
			) : data.length === 0 ? (
				<div className={style.noRecipes}>
					<h3>No recipes found</h3>
					<Button label="Show all recipes" onClick={handleRefresh} />
				</div>
			) : (
				<>
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
				</>
			)}
			<div className={`card ${style.paginator}`}>
				<Paginator
					className={style.bar}
					first={first}
					rows={rows}
					totalRecords={data.length}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
};
