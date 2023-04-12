import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./protectedRoute";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<ToastContainer
					transition={Zoom}
					autoClose={2000}
					position={"top-right"}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					draggable={false}
					pauseOnHover
					theme="dark"
				></ToastContainer>
				<Routes>
					<Route path="/login" element={<Login></Login>}></Route>
					<Route path="/signUp" element={<SignUp></SignUp>}></Route>

					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>

					{/* Default page active todos */}
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					></Route>
					<Route path="*" element={<ErrorPage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
