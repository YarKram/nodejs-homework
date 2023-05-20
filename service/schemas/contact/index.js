const Contact = require("./contact");

const getAllContacts = (pageNum, limitNum, filter, { owner }) => {
	limitNum = parseInt(limitNum);

	const startIndex = (pageNum - 1) * limitNum;
	return Contact.find({ ...filter, owner })
		.skip(startIndex)
		.limit(limitNum)
		.populate("owner");
};

const getContactById = (id) => {
	return Contact.findOne({ _id: id });
};

const createContact = (body) => {
	return Contact.create(body);
};

const updateContact = (id, fields) => {
	return Contact.findByIdAndUpdate({ _id: id }, fields);
};

const removeContact = (id) => {
	return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, { favorite }) => {
	return Contact.findByIdAndUpdate(
		{ _id: id },
		{ favorite },
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
