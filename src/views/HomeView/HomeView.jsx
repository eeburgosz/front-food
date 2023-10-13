import React from "react";
import { CardsContainer, Filters, Footer, NavBar } from "./../../components";
import style from "./Home.module.css";

export const HomeView = () => {
	return (
		<div>
			<NavBar />
			<div className={style.body}>
				<Filters />
				<CardsContainer />
			</div>
			<Footer />
		</div>
	);
};
