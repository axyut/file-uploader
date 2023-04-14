import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const ProtectedRoute = (props) => {
	const token = localStorage.getItem("token");
	if (token == (undefined || null)) {
		toast.error("Please get valid Token!");
		return <Navigate to="/login"></Navigate>;
	}
	const decoded = jwtDecode(token);
	if (decoded.exp < Date.now() / 1000) {
		localStorage.removeItem("token");
		toast.error("Token Expired. Please Log In.");
		return <Navigate to="/login"></Navigate>;
	}

	return props.children;
};

export default ProtectedRoute;
