const express = require("express");

const ctrlUser = require("../../controllers/users");

// const authMiddleware = require("../../middleware/checkAuth");
const { upload, authMiddleware } = require("../../middleware");

const router = express.Router();

router.post("/register", ctrlUser.register);
router.post("/login", ctrlUser.login);
router.post("/logout", authMiddleware, ctrlUser.logout);
router.get("/current", authMiddleware, ctrlUser.getCurrentUser);
// router.patch("/:id", authMiddleware, ctrlUser.updateSubscription);

router.patch(
	"/avatars",
	authMiddleware,
	upload.single("avatar"),
	ctrlUser.updateAvatar
);

module.exports = router;
