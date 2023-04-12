import { useEffect, useState } from "react";
import verifyJWT from "../utils/verifyJWT";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AXIOS from "../axios/custom_axios";
import { API } from "../api/api_constants";

const Home = () => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState({}); // we are getting back an object from our api

	const logout = () => {
		localStorage.removeItem("token");
		toast.info("Logged Out!");
		navigate("/");
	};
	if (!posts) {
		return <pre>Loading...</pre>;
	}

	const display = async () => {
		const token = localStorage.getItem("token");
		const bearerToken = `Bearer ${token}`;

		const { data } = await AXIOS.get(API.AUTH.JWT, {
			headers: { Authorization: bearerToken },
		});

		setPosts(data);
	};
	useEffect(() => {
		display();
		console.log(posts);
	}, []);

	const renderedPosts = Object.values(posts).map((post) => {
		return (
			<>
				<h3>{post.uuid}</h3>
				<h3>{post.email}</h3>
			</>
		);
	});
	return (
		<div style={{ margin: "20px" }}>
			<h1>Welcome to Home Page</h1>

			<button onClick={logout}>Logout</button>
			<div>{renderedPosts}</div>
		</div>
	);
};

export default Home;
