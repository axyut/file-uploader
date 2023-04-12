const express = require("express");
const router = express.Router();

//const authenticate = require("../middleware/authenticate");
const { login, register } = require("../controllers/auth");

router.post("/register", register);
//router.post("/login", login);

router.get("/login", login);

module.exports = router;
