const service = require("../../service/schemas/user");

const updateSubscription = async (req, res) => {
	const { id } = req.params;
	const { subscription } = req.body;

	if (!["starter", "pro", "business"].includes(subscription)) {
		return res.status(400).json({ message: "Invalid subscription level." });
	}

	try {
		const updatedUser = await service.updateUserSubscription(id, {
			subscription: subscription,
		});
		res.json(updatedUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = updateSubscription;
