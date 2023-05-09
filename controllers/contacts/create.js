const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().required().min(1).max(20),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]{9}$/)
		.required(),
});

const service = require("../../service");

const create = async (req, res) => {
	try {
		const { error, value } = contactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		service.createContact(value);

		res.status(201).json({
			status: "success",
			code: 201,
			data: value,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = create;
