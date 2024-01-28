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
					POST__register: "/api/auth/register",
					POST__login: "/api/auth/login",
				},
				user: {
					GET__AUTH__basicdata: "/api/user/basicdata",
					DELETE__AUTH__user: "/api/user/del",
					GET__AUTH__deleteAllUser: "/api/auth/delete",
				},
				file: {
					POST__AUTH__uploadfile: "/api/file/upload",
					DELETE__AUTH__everyFile: "/api/file/delete_all",
					DELETE__AUTH__oneFile: "/api/file/:fileId",
					GET_fileInfo: "/api/file/info/:fileId",
					GET_download: "/api/file/download/:fileId",
				},
			},
		},
	});
});
module.exports = router;
