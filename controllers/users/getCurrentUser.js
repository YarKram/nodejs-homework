const jwt = require("jsonwebtoken");
const User = require("../../service/schemas/user/user");
require("dotenv").config();

// const service = require("../../service/schemas/user");

const { SECRET_KEY } = process.env;

const getCurrentUser = async (req, res) => {
	const token = req.headers.authorization;

	if (!token || token.split(" ").length !== 2) {
		return res.status(401).json({ message: "Not authorized" });
	}

	const bearerToken = token.split(" ")[1];
	const { id } = jwt.verify(bearerToken, SECRET_KEY);

	const userToFind = await User.findById(id);

	if (!userToFind) {
		return res.status(401).json({ message: "Not authorized" });
	}

	res.status(200).json({
		email: userToFind.email,
		subscription: userToFind.subscription,
	});
};

module.exports = getCurrentUser;
