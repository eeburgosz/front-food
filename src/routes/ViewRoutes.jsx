import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CreateView, DetailView, HomeView } from "../views";

export const ViewRoutes = () => {
	return (
		<div>
			<Routes>
				<Route path="/recipes" element={<HomeView />} />
				<Route path="/recipes/:id" element={<DetailView />} />
				<Route path="/create" element={<CreateView />} />
				<Route path="/*" element={<Navigate to="/recipes" />} />
			</Routes>
		</div>
	);
};
