const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../service/schemas/user/user");
const service = require("../../service/schemas/user");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const schema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});

const register = async (req, res) => {
	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).json({ error: error.details[0].message });
	} else {
		const { email, password } = value;
		try {
			const existingUser = await service.getByEmail({ email });
			if (existingUser) {
				res.status(409).json({ message: "Email in use" });
			} else {
				const saltRounds = 10;
				const hashedPassword = await bcrypt.hash(password, saltRounds);

				const avatarURL = gravatar.url(email);

				const verificationToken = nanoid();

				const newUser = new User({
					email,
					password: hashedPassword,
					avatarURL,
					verificationToken,
				});

				const verifyEmail = {
					to: email,
					subject: "Verify email",
					html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click here to verify email</a>`,
				};

				await sendEmail(verifyEmail);

				await newUser.save();

				res
					.status(201)
					.json({ email: newUser.email, password: newUser.password });
			}
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
};

module.exports = register;
