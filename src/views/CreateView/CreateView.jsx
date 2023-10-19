import React, { useEffect, useState } from "react";
import style from "./Create.module.css";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, postNewRecipe } from "../../redux-toolkit/thunks";
import { getDishTypes } from "../../utils/filters";
import {
	validatorName,
	validatorSteps,
	validatorSummary,
} from "../../utils/validator";

const initialState = {
	name: "",
	img: "",
	summary: "",
	score: 1,
	healthScore: 1,
	stepByStep: [
		{
			number: 1,
			step: "",
		},
	],
	dishTypes: [],
	types: [],
};

export const CreateView = () => {
	const dispatch = useDispatch();

	const { allRecipes, allTypes, isLoading } = useSelector(
		(state) => state.recipes
	);
	const allDietTypes = allTypes.map((type) => type.name);
	const allDishTypes = getDishTypes(allRecipes);

	useEffect(() => {
		dispatch(getAllTypes());
	}, [dispatch]);

	const [value, setValue] = useState(initialState);

	const addStep = () => {
		const newStepId = value.stepByStep.length + 1;
		setValue({
			...value,
			stepByStep: [
				...value.stepByStep,
				{
					number: newStepId,
					step: "",
				},
			],
		});
	};

	const deleteStep = (stepId) => {
		const updatedSteps = value.stepByStep.filter(
			(step) => step.number !== stepId
		);
		setValue({
			...value,
			stepByStep: updatedSteps,
		});
	};

	const handleStepChange = (stepId, newText) => {
		const updatedSteps = value.stepByStep.map((step) =>
			step.number === stepId ? { ...step, step: newText } : step
		);
		setValue({
			...value,
			stepByStep: updatedSteps,
		});
	};

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		});
	};
	const handleScoreChange = (e) => {
		setValue({
			...value,
			[e.originalEvent.target.name]: e.value,
		});
	};

	const { name, summary, stepByStep } = value;

	const handleSubmit = (e) => {
		e.preventDefault();
		const nameError = validatorName(name, allRecipes);
		if (nameError) {
			Swal.fire({
				icon: "error",
				title: "Oops!",
				text: nameError,
			});
			return;
		}
		const summaryError = validatorSummary(summary);
		if (summaryError) {
			Swal.fire({
				icon: "error",
				title: "Oops!",
				text: summaryError,
			});
			return;
		}
		const stepError = validatorSteps(stepByStep);
		if (stepError) {
			Swal.fire({
				icon: "error",
				title: "Oops!",
				text: stepError,
			});
			return;
		}
		dispatch(postNewRecipe(value));
		Swal.fire({
			icon: "success",
			title: "Recipe has been created successfully",
			showConfirmButton: false,
			timer: 1500,
		});
		setValue(initialState);
	};
	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<div className={style.container}>
			{(allDietTypes.length && allDishTypes.length) === 0 && isLoading ? (
				<h1>Loading</h1>
			) : (
				<form className={style.form} onSubmit={handleSubmit}>
					<h2>Create your own recipe</h2>
					<div className={style.group}>
						<label htmlFor="">Name: </label>
						<InputText onChange={handleChange} name="name" />
					</div>
					<div className={style.group}>
						<label htmlFor="">Image: </label>
						<InputText onChange={handleChange} name="img" />
					</div>
					<div className={style.group}>
						<label htmlFor="">Summary: </label>
						<InputTextarea onChange={handleChange} name="summary" />
					</div>
					<Divider className={style.dividers} align="center">
						<span>Scores</span>
					</Divider>
					<div className={style.scores}>
						<div className={style.group}>
							<label htmlFor="">Score: </label>
							<InputNumber
								value={value.score}
								name="score"
								onChange={handleScoreChange}
							/>
						</div>
						<div className={style.group}>
							<label htmlFor="">Health score: </label>
							<InputNumber
								value={value.healthScore}
								name="healthScore"
								onChange={handleScoreChange}
							/>
						</div>
					</div>
					<Divider className={style.dividers} align="center">
						<span>Types</span>
					</Divider>
					<div className={style.types}>
						<div className={style.group}>
							<label htmlFor="">Dish types: </label>
							<MultiSelect
								name="dishTypes"
								display="chip"
								value={value.dishTypes}
								options={allDishTypes}
								className={style.multiselect}
								placeholder="Select at least one"
								onChange={handleChange}
							/>
						</div>
						<div className={style.group}>
							<label htmlFor="">Diet types: </label>
							<MultiSelect
								name="types"
								display="chip"
								value={value.types}
								options={allDietTypes}
								className={style.multiselect}
								placeholder="Select at least one"
								onChange={handleChange}
							/>
						</div>
					</div>
					<Divider className={style.dividers} align="center">
						<span>Steps</span>
					</Divider>
					<div className={style.stepsGroup}>
						{value.stepByStep.map((step) => (
							<div key={step.number} className={style.steps}>
								<div className={style.inputArea}>
									<label>Step {step.number}: </label>
									<InputTextarea
										value={step.step}
										onChange={(e) =>
											handleStepChange(step.number, e.target.value)
										}
										name="stepByStep"
									/>
								</div>
								<Button
									type="button"
									icon="pi pi-trash"
									className={`p-button-danger ${style.delete}`}
									onClick={() => deleteStep(step.number)}
								/>
							</div>
						))}
						<Button
							className={style.add}
							type="button"
							icon="pi pi-plus"
							onClick={addStep}
						/>
					</div>
					<div className={style.buttons}>
						<Button className={style.submit} type="submit" label="Submit" />
						<Button
							type="button"
							className={style.goback}
							label="Go back"
							icon="pi pi-arrow-left"
							onClick={handleGoBack}
						/>
					</div>
				</form>
			)}
		</div>
	);
};
