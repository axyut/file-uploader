const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const {
	uploadFile,
	deleteAllFiles,
	deleteOneFile,
} = require("../controllers/file");
const { fileInfo, download } = require("../controllers/download");

router.post("/upload", authenticate, uploadFile);

router.get("/info/:fileId", fileInfo);
router.get("/download/:fileId", download);

// DELETE
router.delete("/delete_all", authenticate, deleteAllFiles);
router.delete("/:fileId", authenticate, deleteOneFile);

module.exports = router;
