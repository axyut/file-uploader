const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const fileRouter = require("./file");

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/file", fileRouter);

// APIs
router.get("/", (req, res) => {
	res.json({
		msg: "Welcome",
		routes: {
			server: "/",
			client: "http://127.0.0.1:5000/",
			api: {
				auth: {
					POST_register: "/api/auth/register",
					POST_login: "/api/auth/login",
					GET_delete: "/api/auth/delete",
				},
				user: {
					GET_basicdata: "/api/user/basicdata",
					DELETE_USER: "/api/user/del",
				},
				file: {
					POST_uploadfile: "/api/file/upload",
					DELETE_DELETE_EVERYTHING: "/api/file/delete_all",
					DELETE_ONE_FILE: "/api/file/:fileId",
				},
			},
		},
	});
});
module.exports = router;
