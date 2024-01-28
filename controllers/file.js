const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const User = require("../models/User");
const File = require("../models/File");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

let storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads/"),
	filename: (req, file, cb) => {
		const uniqueName = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;
		cb(null, uniqueName);
	},
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 10 } }).single(
	"file"
); //10mb

const uploadFile = async (req, res) => {
	try {
		const { uuid } = req.userFound;
		const { _id: userId } = await User.findOne({
			uuid: uuid,
		}).select("_id");

		upload(req, res, async (err) => {
			if (err) {
				return res
					.status(Code.EXPECTATION_FAILED)
					.json({ msg: err.message || err.name });
			}
			console.log(req.file.filename);
			const file = new File({
				filename: req.file.filename,
				fileId: uuidv4(),
				path: req.file.path,
				size: req.file.size,
				userId,
			});
			const response = await file.save();

			res.status(Code.CREATED).json({
				msg: "Sucessfully Uploaded to Server!",
				file: `${process.env.CLIENT_URL}/download/${response.fileId}`,
				fileId: response.fileId,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(Code.CONFLICT).json({ msg: error.message });
	}
};

// Uploads directory from root of server/ localmachine
//D:\digital\NodeJs-express\file_uploader\uploads\1681394110062-484276344.jpg
const directory = path.join(process.cwd(), "uploads");

const deleteAllFiles = async (req, res) => {
	try {
		const filesToDelete = await File.find({}).select("filename -_id");
		const deleted = await File.deleteMany({});
		if (deleted) {
			fs.readdir(directory, (error, files) => {
				if (error) throw error;

				for (const file of files) {
					const filePath = path.join(directory, file);
					//console.log(filePath);
					const fileToDelete = filesToDelete.find(
						(item) => item.filename === file
					);
					if (fileToDelete) {
						fs.unlink(filePath, (err) => {
							if (err) throw err;
							console.log(`Deleted file: ${file}`);
						});
					}
				}
			});

			res.status(Code.GONE).json({
				msg: "All Files successfully deleted!",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(Code.INTERNAL_SERVER_ERROR).json({
			msg: error.message || err.name,
		});
	}
};

const deleteOneFile = async (req, res) => {
	const { uuid } = req.userFound;
	const fileId = req.params.fileId;
	try {
		const { _id: userId } = await User.findOne({
			uuid: uuid,
		}).select("_id");
		const fileToDelete = await File.find({ userId, fileId }).select(
			"filename -_id"
		);
		const deleted = await File.findOneAndDelete({ userId, fileId });
		if (deleted) {
			fs.readdir(directory, (error, files) => {
				if (error) throw error;

				for (const file of files) {
					const filePath = path.join(directory, file);

					if (fileToDelete) {
						fs.unlink(filePath, (err) => {
							if (err) throw err;
							console.log(`Deleted file: ${file}`);
						});
					}
				}
			});

			res.status(Code.GONE).json({
				msg: "Deleted One file",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(Code.INTERNAL_SERVER_ERROR).json({
			msg: error.message || err.name,
		});
	}
};

const deleteAllFilesOfOneUser = async (uuid) => {
	try {
		const { _id: userId } = await User.findOne({
			uuid: uuid,
		}).select("_id");

		const filesToDelete = await File.find({ userId }).select(
			"filename -_id"
		);
		const deleted = await File.deleteMany({ userId });
		if (deleted) {
			fs.readdir(directory, (error, files) => {
				if (error) throw error;

				for (const file of files) {
					const filePath = path.join(directory, file);

					const fileToDelete = filesToDelete.find(
						(item) => item.filename === file
					);
					if (fileToDelete) {
						fs.unlink(filePath, (err) => {
							if (err) throw err;
							console.log(`Deleted file: ${file}`);
						});
					}
				}
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	uploadFile,
	deleteAllFiles,
	deleteOneFile,
	deleteAllFilesOfOneUser,
};
