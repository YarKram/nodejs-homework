const { nanoid } = require("nanoid");
const { addContact } = require("../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().required().min(1).max(20),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]{9}$/)
		.required(),
});

const postContactController = async (req, res) => {
	try {
		const { error, value } = contactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const newContact = {
			id: nanoid(),
			...value,
		};

		addContact(newContact);

		res.status(201).json({
			status: "success",
			code: 201,
			data: { newContact },
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = postContactController;
