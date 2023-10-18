import React, { useEffect, useState } from "react";
import style from "./Detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../../redux-toolkit/thunks";
import { Footer } from "../../components";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";
import noImage from "../../assets/noImage.jpg";

export const DetailView = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	useEffect(() => {
		dispatch(getRecipeById(id));
	}, [dispatch, id]);

	const { recipeById, isLoading } = useSelector((state) => state.recipes);

	const {
		name,
		img,
		score,
		healthScore,
		summary,
		stepByStep,
		dishTypes,
		Types,
	} = recipeById;

	const [visible, setVisible] = useState(false);

	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<>
			{isLoading || !recipeById ? (
				<Skeleton className={style.skeleton}></Skeleton>
			) : (
				<div className={style.container}>
					<div className={style.body}>
						<div className={style.subcontainer1}>
							<img src={img || noImage} alt="img" />
							<div className={style.nameScores}>
								<h3>{name}</h3>
								<div className={style.scores}>
									<div>
										<label htmlFor="">
											<strong>Score: </strong>
										</label>
										<span>{score}</span>
									</div>
									<div>
										<label htmlFor="">
											<strong>Health Score: </strong>
										</label>
										<span>{healthScore}</span>
									</div>
								</div>
							</div>
						</div>
						<div className={style.summarySbS}>
							<div className="card flex justify-content-center">
								<Button
									className={style.button}
									label="Step by step"
									icon="pi pi-external-link"
									onClick={() => setVisible(true)}
								/>
								<Dialog
									header="Step by step:"
									visible={visible}
									className={style.dialog}
									onHide={() => setVisible(false)}
								>
									<span className="m-0">
										{stepByStep?.map(({ step, number }) => (
											<div key={number}>
												<label htmlFor="">
													<strong>Step {number}:</strong>
												</label>
												<p>{step}</p>
											</div>
										))}
									</span>
								</Dialog>
							</div>
							<div className="card">
								<Fieldset legend="Summary">
									<p className="m-0">{summary}</p>
								</Fieldset>
							</div>
						</div>
						<div className={style.types}>
							<div>
								<label htmlFor="">
									<strong>Diet types: </strong>
								</label>
								<span>
									{Types?.map((type, index) => (
										<span key={index}>
											<em>
												{type.name}
												{index < Types.length - 1 ? ", " : "."}
											</em>
										</span>
									))}
								</span>
							</div>
							<div>
								<label htmlFor="">
									<strong>Dish types: </strong>
								</label>
								<span>
									{dishTypes?.map((type, index) => (
										<span key={index}>
											<em>
												{type}
												{index < dishTypes.length - 1 ? ", " : "."}
											</em>
										</span>
									))}
								</span>
							</div>
						</div>
						<Button
							className={style.goback}
							label="Go back"
							icon="pi pi-arrow-left"
							onClick={handleGoBack}
						/>
					</div>
				</div>
			)}
			<Footer />
		</>
	);
};
