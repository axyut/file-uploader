import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AXIOS from "./axios/custom_axios";
import { API } from "./api/api_constants";
import verifyJWT from "./utils/verifyJWT";

const ProtectedRoute = (props) => {
	const token = localStorage.getItem("token");
	if (token == (undefined || null)) {
		return <Navigate to="/login"></Navigate>;
	}

	return props.children;
};

export default ProtectedRoute;
