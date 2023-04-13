const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const {
	uploadFile,
	deleteAllFiles,
	deleteOneFile,
	deleteAllFilesOfOneUser,
} = require("../controllers/file");

router.post("/upload", authenticate, uploadFile);

// DELETE
router.delete("/delete_all", authenticate, deleteAllFiles);
router.delete("/:fileId", authenticate, deleteOneFile);

module.exports = router;
