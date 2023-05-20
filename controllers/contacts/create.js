const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().required().min(1).max(20),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]{9}$/)
		.required(),
});

const service = require("../../service/schemas/contact");

const create = async (req, res) => {
	const { id: owner } = req.user;

	try {
		const { error, value } = contactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		service.createContact({ ...value, owner });

		res.status(201).json({
			data: { ...value, owner },
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = create;
