const User = require("./user");

const getById = (id) => {
	return User.findById(id);
};

const getByEmail = ({ email }) => {
	return User.findOne({ email });
};

const updateUserSubscription = (id, { subscription }) => {
	const updatedUser = User.findByIdAndUpdate(
		id,
		{ subscription },
		{ new: true }
	);
	return updatedUser;
};

module.exports = { getById, getByEmail, updateUserSubscription };
