import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AXIOS from "../axios/custom_axios";
import { API } from "../api/api_constants";
import NavigationBar from "../components/NavBar";

const Home = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({}); // we are getting back an object from our api

	const logout = () => {
		localStorage.removeItem("token");
		toast.info("Logged Out!");
		navigate("/");
	};

	const display = async (ignore) => {
		try {
			const token = localStorage.getItem("token");
			const bearerToken = `Bearer ${token}`;

			const { data } = await AXIOS.get(API.USER.BASIC, {
				headers: { Authorization: bearerToken },
			});

			setUserData(data);
		} catch (error) {
			console.log(error);
			toast.info(error.response.data.msg || error.message || error.name);
		}
	};
	useEffect(() => {
		display();
	}, []);

	return (
		<>
			<NavigationBar />
			<div style={{ margin: "20px" }}>
				<h1>Welcome to Home Page</h1>

				<h2>{userData.firstName}</h2>
				<h2>{userData.lastName}</h2>
				<h2>{userData.uuid}</h2>
				<h2>{userData.email}</h2>
			</div>
		</>
	);
};

export default Home;
