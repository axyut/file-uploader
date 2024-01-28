const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const File = require("../models/File");
const User = require("../models/User");

const fileInfo = async (req, res) => {
	const fileId = req.params.fileId;
	try {
		const { size, filename, userId } = await File.findOne({
			fileId,
		}).select("-_id size filename userId");
		const { firstName, lastName, email } = await User.findById(
			userId
		).select("-_id firstName lastName email");

		res.status(Code.ACCEPTED).json({
			size,
			filename,
			firstName,
			lastName,
			email,
		});
	} catch (error) {
		console.log(error);
		res.status(Code.NOT_FOUND).json({
			msg: error.message || "Cannot provide file information.",
		});
	}
};

const download = async (req, res) => {
	try {
		const file = await File.findOne({ fileId: req.params.fileId }).select(
			"-_id path filename"
		);

		// Link expired
		if (!file) {
			return res
				.status(Code.NOT_FOUND)
				.json({ error: "Link has been expired." });
		}

		const filePath = `${__dirname}/../${file.path}`;
		console.log(`${file.filename} Downloaded!`);
		res.download(filePath);
	} catch (error) {
		console.log(error);
		res.status(Code.NOT_FOUND).json({
			msg: error.message || "Download Route Error",
		});
	}
};

module.exports = { fileInfo, download };
