import axios from "axios";

const custom_axios = axios.create({
	// with vite import env vars with import.meta.env
	baseURL: import.meta.env.VITE_BACKEND,
	headers: {
		Accept: "*/*",
		"Content-Type": "application/json",
	},
	//timeout: 5000, // 5 seconds
});

export default custom_axios;
