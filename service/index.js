const Contact = require("./schemas/contact");

const getAllContacts = async () => {
	return Contact.find();
};

const getContactById = (id) => {
	return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone }) => {
	return Contact.create({ name, email, phone });
};

const updateContact = (id, fields) => {
	return Contact.findByIdAndUpdate({ _id: id }, fields);
};

const removeContact = (id) => {
	return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, fields) => {
	return Contact.findByIdAndUpdate(
		{ _id: id },
		{ favorite: fields.favorite },
		{
			new: true,
		}
	);
};

module.exports = {
	getAllContacts,
	getContactById,
	removeContact,
	createContact,
	updateContact,
	updateStatusContact,
};
