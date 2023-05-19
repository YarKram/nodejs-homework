const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../../service/schemas/user/user");
require("dotenv").config();
const { SECRET_KEY } = process.env;

// const service = require("../../service/schemas/user");

const schema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const login = async (req, res) => {
	const { error } = schema.validate(req.body);
	if (error) {
		res.status(400).json({ error: error.details[0].message });
		return;
	}
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		res.status(401).json({ message: "Email or password is incorrect" });
		return;
	}
	const payload = { id: user._id, email };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
	res.status(200).json({
		token,
	});
};

module.exports = login;
