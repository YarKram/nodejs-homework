const upload = require("./upload");
const authMiddleware = require("./checkAuth");

module.exports = {
	upload,
	authMiddleware,
};
