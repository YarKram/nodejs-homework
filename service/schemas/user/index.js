const User = require("./user");

const getById = (id) => {
	return User.findById(id);
};

module.exports = getById;
