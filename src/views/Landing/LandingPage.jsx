import React from "react";
import { Button } from "primereact/button";
import style from "./Landing.module.css";
import videoDesktop from "../../assets/landing.mp4";
import videoMobile from "../../assets/landingMobile.mp4";
import { Link } from "react-router-dom";

export const LandingPage = () => {
	return (
		<div className={style.container}>
			<video autoPlay muted loop className={style.video}>
				<source
					src={window.innerWidth <= 768 ? videoMobile : videoDesktop}
					type="video/mp4"
				/>
			</video>
			<div className={style.overlay}>
				<h3>Welcome to my Food App</h3>
				<Link to={"/recipes"}>
					<Button className={style.enter} label="Enter" />
				</Link>
			</div>
		</div>
	);
};
