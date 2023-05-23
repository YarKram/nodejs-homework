const Joi = require("joi");
const User = require("../../service/schemas/user/user");
const { sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const schema = Joi.object({
	email: Joi.string().email().required(),
});

const resendVerificationEmail = async (req, res) => {
	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).json({ error: error.details[0].message });
	}
	const { email } = value;
	const user = await User.findOne({ email });

	if (!user) {
		res.status(401).json({ message: "Email not found" });
	}

	if (user.verify) {
		res.status(400).json({ message: "Verification has already been passed" });
	}

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click here to verify email</a>`,
	};

	await sendEmail(verifyEmail);

	res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerificationEmail;
