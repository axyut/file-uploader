import jwt_decode from "jwt-decode";
import AXIOS from "../axios/custom_axios";
import { API } from "../api/api_constants";

const verifyJWT = async (err, next) => {
	try {
		const token = localStorage.getItem("token");
		const userInfo = jwt_decode(token);

		const bearerToken = `Bearer ${token}`;
		const response = await AXIOS.post(API.AUTH.JWT, {
			headers: {
				Authorization: bearerToken,
			},
		});
		console.log(userInfo, response.data);
		if (userInfo.email == response.data.user.email) {
			console.log("Verfied");
		}
		next();
	} catch (err) {
		console.log(err);
	}
};

export default verifyJWT;
