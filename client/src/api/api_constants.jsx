export const API = {
	USER: {
		FIND_ONE: (userId) => {
			return "/user/" + userId;
		},

		FIND_ALL: "/user",
		DELETE: (userId) => {
			return "/user/" + userId;
		},
	},
	AUTH: {
		JWT: "/api/auth/jwt",
		LOGIN: "/api/auth/login",
		REGISTER: "/api/auth/register",
	},
};
