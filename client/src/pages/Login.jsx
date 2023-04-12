import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import custom_axios from "../axios/custom_axios";
import { ApiConstants } from "../api/api_constants";
import { getLoginInfo } from "../utils/LoginInfo";

import "../css/login_signup.css";

const Login = () => {
	let navigate = useNavigate();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};
	const loginApp = async () => {
		const { email, password } = user;
		if (email == "" || password == "") {
			toast.info("Please fill the information");
			return;
		}
		try {
			const response = await custom_axios.post(ApiConstants.CV.LOGIN, {
				email: email,
				password: password,
			});

			// Setting Up recieved token for the user
			console.log(response);

			localStorage.setItem("token", response.data.token);
			dispatchEvent(new Event("storage"));

			// Welcoming User by decoding token
			const firstName = getLoginInfo()?.firstName;
			toast.info(`Welcome Back! ${firstName}`);
			toast.info(response.data.message);
			navigate("/");
		} catch (error) {
			localStorage.removeItem("token");
			console.log(error);

			toast.warn("Login Failed");
		}
	};
	return (
		<div className="main">
			<div>
				<h3 style={{ display: "grid", justifyContent: "center" }}>
					Account Login.
				</h3>
				<div className="container">
					<form>
						<div className="inputFields">
							<label>Email</label>
							<input
								type="email"
								name="email"
								value={user.email}
								onChange={handleChange}
								autoComplete="off"
								placeholder="chad@mail.com"
							/>
						</div>
						<div className="inputFields">
							<label>Password</label>
							<input
								type="password"
								name="password"
								value={user.password}
								onChange={handleChange}
								autoComplete="off"
								placeholder="********"
							/>
						</div>
						<div>
							<button
								className="active-btn"
								onClick={loginApp}
								type="button"
							>
								<span>Login</span>
							</button>
						</div>
					</form>
					<span>
						Haven't Registered Yet?
						<a
							onClick={() => {
								navigate("/signUp");
							}}
						>
							Sign Up!
						</a>
					</span>

					<span>
						<a
							href="https://github.com/axyut/resume_maker.git"
							target="_blank"
						>
							About?
						</a>
					</span>
					<span>
						<a
							href={import.meta.env.VITE_BASE_URL + "/api"}
							target="_blank"
						>
							API?
						</a>
					</span>
				</div>
			</div>
			<div className="container">
				<h1>File Uploader Means Uploading File to the server</h1>
				<h2>File Uploader</h2>
				<h3>File Uploader</h3>
				<span>File Uploader</span>
				<label>File Uploader</label>
				<p>File Uploader</p>
			</div>
		</div>
	);
};

export default Login;
