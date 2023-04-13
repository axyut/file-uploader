const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { userInfo, deleteUser } = require("../controllers/user");

router.get("/basicdata", authenticate, userInfo);

router.delete("/del", authenticate, deleteUser);

module.exports = router;
