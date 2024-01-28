import { toast } from "react-toastify";
import AXIOS from "../axios/custom_axios";
import { API } from "../api/api_constants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavBar";

const Download = () => {
	const { fileId } = useParams();
	const [fileData, setFileData] = useState({});

	const fileInfo = async () => {
		const { data } = await AXIOS.get(API.FILE.INFO(fileId));
		setFileData(data);
		toast.success("File ready to Download!");
	};

	useEffect(() => {
		fileInfo();
	}, []);

	return (
		<>
			<NavigationBar />
			<h2>Download file!</h2>
			<h2>File Information:</h2>
			<h3>File: {fileData.filename}</h3>
			<h3>Size: {fileData.size / (100000 * 10)} mb</h3>
			<h2>Owner Information:</h2>
			<h3>
				Name: {fileData.firstName} {fileData.lastName}
			</h3>

			<h3>Email: {fileData.email}</h3>
			<span>
				<button className="active-btn">
					<a
						href={`${
							import.meta.env.VITE_BACKEND
						}${API.FILE.DOWNLOAD(fileId)}`}
					>
						Download
					</a>
				</button>
			</span>
		</>
	);
};

export default Download;
