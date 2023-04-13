import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../css/navbar.css";

const NavigationBar = () => {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(false);

	const handleMenu = () => {
		setIsMobile(!isMobile);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		toast.info("Logged Out!");
		navigate("/");
		return <Navigate to="/login"></Navigate>;
	};

	return (
		<nav className={`navbar ${isMobile ? "navbar-mobile" : ""}`}>
			<div className="navbar-logo">
				<Link to="/">
					<h3>Logo</h3>
				</Link>
			</div>
			<ul className={`navbar-links ${isMobile ? "active" : ""}`}>
				<li className="navbar-item">
					<Link to="/">
						<div className="navbar-link">Home</div>
					</Link>
				</li>
				<li className="navbar-item">
					<Link to="/user">
						<div className="navbar-link">User</div>
					</Link>
				</li>
				<li className="navbar-item">
					<Link to="/">
						<div className="navbar-link" onClick={handleLogout}>
							Logout
						</div>
					</Link>
				</li>
			</ul>
			<div className="navbar-mobile-icon" onClick={handleMenu}>
				{isMobile ? "Mobile" : "PC"}
			</div>
		</nav>
	);
};

export default NavigationBar;
