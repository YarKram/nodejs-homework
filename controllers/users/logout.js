const service = require("../../service/schemas/user");

const logout = async (req, res) => {
	try {
		const user = await service.getById(req.user._id);

		if (!user) {
			res.status(401).json({ message: "Not authorized" });
			return;
		}

		user.token = null;

		await user.save();

		res.status(204).json({ message: "No Content" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = logout;
