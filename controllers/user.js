const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { deleteAllFilesOfOneUser } = require("./file");

const userInfo = async (req, res) => {
	const { firstName, lastName, email, uuid } = req.userFound;

	res.status(Code.ACCEPTED).json({
		firstName,
		lastName,
		email,
		uuid,
	});
};

const deleteUser = async (req, res) => {
	const { uuid } = req.userFound;
	try {
		deleteAllFilesOfOneUser(uuid);
		deleteOne = await User.findOneAndDelete({ uuid });
		res.status(Code.GONE).json({
			msg: "User Deleted.",
		});
	} catch (error) {
		console.log(error);
		res.status(Code.INTERNAL_SERVER_ERROR).json({
			msg: error.message || err.name,
		});
	}
};

const deleteAll = async (req, res) => {
	await User.deleteMany();
	res.status(Code.GONE).json({ msg: "All Users Deleted Successfully!" });
};

module.exports = { userInfo, deleteUser, deleteAll };
