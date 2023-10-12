import React from "react";
import style from "./Footer.module.css";
import logo from "../../assets/logo.png";
import "primeicons/primeicons.css";
import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<div className={style.container}>
			<div className={style.subcontainer1}>
				<div className={style.logo}>
					<img src={logo} alt="Logo" />
					<h2>Ernesto Burgos</h2>
				</div>
				<div className={style.developer}>
					<p>Full stack developer</p>
					<span>
						React.js | Redux | Node.js | Express | Postgresql | Sequelize
					</span>
				</div>
			</div>
			<div className={style.subcontainer2}>
				<div className={style.contactMe}>
					<h3>Contact me</h3>
					<div className={style.socialMedia}>
						<Link to={"https://github.com/eeburgosz"} target="_blank">
							<i className="pi pi-github"></i>
						</Link>
						<Link to={"https://wa.me/+5491127352415"} target="_blank">
							<i className="pi pi-whatsapp"></i>
						</Link>
						<Link to={"https://www.instagram.com/eburgos88/"} target="_blank">
							<i className="pi pi-instagram"></i>
						</Link>
						<Link to={"https://www.linkedin.com/in/eeburgosz/"} target="_blank">
							<i className="pi pi-linkedin"></i>
						</Link>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	);
};
