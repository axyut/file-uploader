import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AXIOS from "../axios/custom_axios";
import { API } from "../api/api_constants";
import NavigationBar from "../components/NavBar";

const Home = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({}); // we are getting back an object from our api

	const display = async (ignore) => {
		try {
			const bearerToken = `Bearer ${localStorage.getItem("token")}`;

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

	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [message, setMessage] = useState("");

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
		setFileName(selectedFile.name);
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const formData = new FormData();
			const bearerToken = `Bearer ${localStorage.getItem("token")}`;
			formData.append("file", file);

			console.log(formData);

			const { data } = await AXIOS.post(API.FILE.UPLOAD, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: bearerToken,
				},
			});
			toast.success(data.msg);
			setFile(null);
			setMessage(data.fileId);
		} catch (error) {
			console.log(error);
			toast.error(error.name + ": " + error.message);
		}
	};

	return (
		<>
			<NavigationBar />
			<div style={{ margin: "20px" }}>
				<h1>Welcome to Home Page</h1>
				<div>
					<form onSubmit={handleSubmit} encType="multipart/form-data">
						{file ? (
							<label>Selected file: {fileName}</label>
						) : (
							<label>
								<button
									type="button"
									className="active-btn"
									onClick={() =>
										document
											.getElementById("file-input")
											.click()
									}
								>
									Select file
								</button>
							</label>
						)}
						<input
							type="file"
							name="file"
							id="file-input"
							onChange={handleFileChange}
							style={{ display: "none" }}
						/>

						<button type="submit">Submit</button>
					</form>
					<a href={`/download/${message}`}>
						{message && (
							<button className="active-btn">
								<label>Link</label>
							</button>
						)}
					</a>
				</div>

				<h3>
					User: {userData.firstName} {userData.lastName}
				</h3>

				<h3>User Id: {userData.uuid}</h3>
				<h3>Email: {userData.email}</h3>
			</div>
		</>
	);
};

export default Home;
