const express = require("express");
const router = express.Router();

//const authenticate = require("../middleware/authenticate");
const { login, register } = require("../controllers/auth");
const verifyJWT = require("../authentication/verify");

router.post("/register", register);
router.post("/login", login);

// not being accessed by anyone right now
router.get("/jwt", verifyJWT);

module.exports = router;
