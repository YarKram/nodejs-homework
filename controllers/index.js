const getAllContacts = require("./getAllContactsController");
const getContactByIdController = require("./getContactByIdController");
const postContactController = require("./postContactController");
const deleteContactByIdController = require("./deleteContactByIdController");
const putContactByIdController = require("./putContactByIdController");

module.exports = {
	getAllContacts,
	getContactByIdController,
	postContactController,
	deleteContactByIdController,
	putContactByIdController,
};
