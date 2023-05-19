const service = require("../../service/schemas/contact");

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

module.exports = updateStatus;
