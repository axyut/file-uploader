const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { userInfo, deleteUser, deleteAll } = require("../controllers/user");

router.get("/basicdata", authenticate, userInfo);

router.delete("/del", authenticate, deleteUser);
router.get("/delete", authenticate, deleteAll);

module.exports = router;
