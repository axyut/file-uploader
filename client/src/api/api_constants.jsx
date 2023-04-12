export const ApiConstants = {
	TODO: {
		ADD: (userId) => {
			return "/todo/" + userId;
		},
		FIND_NOT_COMPLETED: (userId) => {
			return "/todo/notCompleted/" + userId;
		},
		FIND_COMPLETED: (userId) => {
			return "/todo/completed/" + userId;
		},
		MARK_COMPLETE: (todoId) => {
			return "/todo/" + todoId;
		},
		DELETE: (todoId) => {
			return "/todo/" + todoId;
		},
	},
	USER: {
		FIND_ONE: (userId) => {
			return "/user/" + userId;
		},
		SIGN_UP: "/user/signUp",
		FIND_ALL: "/user",
		DELETE: (userId) => {
			return "/user/" + userId;
		},
	},
	LOGIN: "/auth/login",
	CV: {
		PROFILE: "/cvProfile",
		REGISTER: "/register",
		LOGIN: "/signin",
	},
};
