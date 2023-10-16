import React, { useEffect, useState } from "react";
import style from "./Create.module.css";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllDishTypes,
	getAllTypes,
	postNewRecipe,
} from "../../redux-toolkit/thunks";

const initialState = {
	name: "",
	img: "",
	summary: "",
	score: "",
	healthScore: "",
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

	useEffect(() => {
		dispatch(getAllDishTypes());
		dispatch(getAllTypes());
	}, [dispatch]);

	const { allDishTypes, allTypes } = useSelector((state) => state.recipes);
	const allDietTypes = allTypes.map((type) => type.name);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(postNewRecipe(value));
		setValue(initialState);
	};

	// console.log(value);

	return (
		<div className={style.container}>
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
				<Button className={style.submit} type="submit" label="Submit" />
			</form>
		</div>
	);
};
