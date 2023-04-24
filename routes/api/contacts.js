const Joi = require("joi");
const { nanoid } = require("nanoid");
const express = require("express");
const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
} = require("../../models/contacts");

const contactSchema = Joi.object({
	name: Joi.string().required().min(1).max(20),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]{9}$/)
		.required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.json({
			status: "success",
			code: 200,
			data: {
				contacts,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await getContactById(id);
		if (contact) {
			return res.json({
				status: "success",
				code: 200,
				data: {
					contact,
				},
			});
		} else {
			return res.status(404).json({
				message: "Not found",
			});
		}
	} catch (error) {
		return next(error);
	}
});

router.post("/", async (req, res, next) => {
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
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await removeContact(id);

		if (!contact) {
			return res.status(404).json({ message: "Not found" });
		}
		return res.status(200).json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
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
		next(error);
	}
});

module.exports = router;
