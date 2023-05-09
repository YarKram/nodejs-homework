const service = require("../../service");

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

module.exports = getById;
