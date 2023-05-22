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

const updateUserAvatar = (id, { avatarURL }) => {
	return User.findByIdAndUpdate(id, { avatarURL });
};

module.exports = {
	getById,
	getByEmail,
	updateUserSubscription,
	updateUserAvatar,
};
