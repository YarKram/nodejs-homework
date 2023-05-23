const express = require("express");

const ctrlUser = require("../../controllers/users");

const { upload, authMiddleware } = require("../../middleware");

const router = express.Router();

router.post("/register", ctrlUser.register);
router.get("/verify/:verificationToken", ctrlUser.verifyUser);
router.post("/verify", ctrlUser.resendVerificationEmail);

router.post("/login", ctrlUser.login);
router.post("/logout", authMiddleware, ctrlUser.logout);
router.get("/current", authMiddleware, ctrlUser.getCurrentUser);
router.patch(
	"/avatars",
	authMiddleware,
	upload.single("avatar"),
	ctrlUser.updateAvatar
);
// router.patch("/:id", authMiddleware, ctrlUser.updateSubscription);

module.exports = router;
