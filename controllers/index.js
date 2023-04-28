const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().required().min(1).max(20),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]{9}$/)
		.required(),
});

const service = require("../service");

const getAll = async (req, res) => {
	try {
		const contacts = await service.getAllContacts();
		res.json({
			status: "success",
			code: 200,
			data: contacts,
		});
	} catch (error) {
		console.log(error);
	}
};

const getById = async (req, res) => {
	try {
		const { id } = req.params;
		const contact = await service.getContactById(id);
		if (contact) {
			return res.json({
				status: "success",
				code: 200,
				data: contact,
			});
		} else {
			return res.status(404).json({
				message: "Not found",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const remove = async (req, res) => {
	try {
		const { id } = req.params;
		const contact = await service.removeContact(id);

		if (!contact) {
			return res.status(404).json({ message: "Contact not found" });
		}
		return res.status(200).json({ message: "Contact deleted successfully" });
	} catch (error) {
		console.log(error);
	}
};

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

const update = async (req, res) => {
	try {
		const { error, value } = contactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const { id } = req.params;

		const updatedContact = await service.updateContact(id, value);

		if (updatedContact) {
			return res.status(200).json({
				status: "success",
				code: 200,
				data: updatedContact,
			});
		}
		return res.status(404).json({ message: "Not found" });
	} catch (error) {
		console.log(error);
	}
};

const updateStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { favorite } = req.body;

		if (!favorite) {
			return res.status(400).json({ message: "Missing field favorite" });
		}

		const result = await service.updateStatusContact(id, { favorite });

		if (!result) {
			return res.status(404).json({ message: "Message not found" });
		}

		return res.status(200).json({ message: "Contact updated successfully" });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAll,
	getById,
	remove,
	create,
	update,
	updateStatus,
};
