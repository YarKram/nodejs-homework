const service = require("../../service");

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

module.exports = getAll;
