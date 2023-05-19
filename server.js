const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const contactsRouter = require("./routes/api/contacts");
//
const usersRouter = require("./routes/api/users");
//
dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: "Use api on routes: /api/contacts",
		data: "Not found",
	});
});

app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).json({
		status: "fail",
		code: 500,
		message: err.message,
		data: "Internal Server Error",
	});
});

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_HOST;
mongoose
	.connect(dbUrl, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`);
		})
	)
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
	});
