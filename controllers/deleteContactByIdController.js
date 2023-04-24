const { removeContact } = require("../models/contacts");

const deleteContactByIdController = async (req, res) => {
	try {
		const { id } = req.params;
		const contact = await removeContact(id);

		if (!contact) {
			return res.status(404).json({ message: "Contact not found" });
		}
		return res.status(200).json({ message: "Contact deleted successfully" });
	} catch (error) {
		console.log(error);
	}
};

module.exports = deleteContactByIdController;
