const { updateContact } = require("../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().required().min(1).max(20),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]{9}$/)
		.required(),
});

const putContactByIdController = async (req, res) => {
	try {
		const { error, value } = contactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const { id } = req.params;

		const updatedContact = await updateContact(id, value);

		if (updatedContact) {
			return res.status(200).json({
				status: "success",
				code: 200,
				data: { updatedContact },
			});
		}
		return res.status(404).json({ message: "Not found" });
	} catch (error) {
		console.log(error);
	}
};

module.exports = putContactByIdController;
