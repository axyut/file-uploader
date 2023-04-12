require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.json({ msg: "Welcome", routes: { api: "/api/register" } });
});

const start = () => {
	PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Listening at http://localhost:${PORT}`);
	});
};

start();
