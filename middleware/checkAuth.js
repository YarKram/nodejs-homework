const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user/user");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	const [bearer, token] = authorization.split(" ");

	if (bearer !== "Bearer") {
		return res.status(401).json({ message: "Not authorized bearer" });
	}

	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		console.log(id);
		const user = await User.findById(id);
		if (!user) {
			return res.status(401).json({ message: "Not authorized user" });
		}

		req.user = user;

		next();
	} catch (error) {
		return next(error);
	}
};

module.exports = authMiddleware;
