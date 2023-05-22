const service = require("../../service/schemas/contact");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

const getAll = async (req, res) => {
	const { _id: owner } = req.user;

	try {
		const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, favorite } = req.query;
		const pageNum = parseInt(page);
		const limitNum = parseInt(limit);
		const filter = favorite ? { favorite: true } : {};

		const contacts = await service.getAllContacts(pageNum, limitNum, filter, {
			owner,
		});
		res.status(200).json({
			data: contacts,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = getAll;
