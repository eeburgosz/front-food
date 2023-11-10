import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import style from "./Landing.module.css";
import videoDesktop from "../../assets/landing.mp4";
import videoMobile from "../../assets/landingMobile.mp4";
import { Dialog } from "primereact/dialog";

export const LandingPage = () => {
	const [visible, setVisible] = useState(true);

	const hideDialog = () => {
		setVisible(false);
	};

	return (
		<>
			<Dialog
				className={style.dialog}
				visible={visible}
				onHide={hideDialog}
				modal
				closable={false}
			>
				<h3>¡AVISO!</h3>
				<p>
					Debido a que el despliegue de la base de datos es en el tier gratuito
					de AWS RDS, la información puede tardar en llegar más tiempo de lo
					esperado, pero esto ocurrirá por única vez hasta que la DB vuelva a
					entrar en estado de stand by.
				</p>
				<p>Gracias por visitar mi app.</p>
				<div className={style.signature}>
					<code>Ernesto Burgos</code>
					<Button onClick={hideDialog} label="Continuar" />
				</div>
			</Dialog>
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
		</>
	);
};
