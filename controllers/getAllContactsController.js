const { listContacts } = require("../models/contacts");

const getAllContactsController = async (req, res) => {
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
		console.log(error);
	}
};

module.exports = getAllContactsController;
