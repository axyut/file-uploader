const express = require("express");
const router = express.Router();

const authRouter = require("./auth");

router.use("/api/auth", authRouter);

// APIs
router.get("/", (req, res) => {
	res.json({
		msg: "Welcome",
		routes: {
			home: "/",
			api: {
				auth: {
					register: "/api/auth/register",
					login: "/api/auth/login",
				},
			},
		},
	});
});
module.exports = router;
