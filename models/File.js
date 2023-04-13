const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
	{
		filename: {
			type: String,
			required: [true, "Filename is required"],
			tirm: true,
			minlength: 2,
			maxlength: 100,
		},
		path: { type: String, required: true },
		size: {
			type: Number,
			required: true,
			validate: {
				validator: function (value) {
					return value <= 10 * 1024 * 1024; // 10MB in bytes
				},
				message: "File size limit exceeded (10MB).",
			},
		},
		fileId: {
			type: String,
			required: [true, "UUID is required"],
			unique: true,
			tirm: true, // trim unwanted spaces
			minlength: 8,
			maxlength: 40,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		sentTo: [
			{
				email: {
					type: String,
					required: [true, "Email is required"],
					tirm: true,
					minlength: 8,
					maxlength: 32,
					match: [
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						"Please provide valid email",
					],
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
