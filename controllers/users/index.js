const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyUser = require("./verifyUser");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
	register,
	login,
	logout,
	getCurrentUser,
	updateSubscription,
	updateAvatar,
	verifyUser,
	resendVerificationEmail,
};
