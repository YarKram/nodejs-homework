const service = require("../../service/schemas/contact");

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

module.exports = remove;
