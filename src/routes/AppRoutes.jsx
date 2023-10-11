import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../views";
import { ViewRoutes } from "./ViewRoutes";

export const AppRoutes = () => {
	return (
		<div>
			<Routes>
				<Route path="/" exact element={<LandingPage />} />
				<Route path="/*" element={<ViewRoutes />} />
			</Routes>
		</div>
	);
};
