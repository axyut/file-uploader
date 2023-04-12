import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = (props) => {
	const token = localStorage.getItem("token");
	if (token == (undefined || null)) {
		return <Navigate to="/login"></Navigate>;
	}
	if (token != null) {
		const userInfo = jwt_decode(token);
		console.log(userInfo);
		return props.children;
	}
};

export default ProtectedRoute;
