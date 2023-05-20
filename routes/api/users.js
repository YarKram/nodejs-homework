const express = require("express");

const ctrlUser = require("../../controllers/users");

const authMiddleware = require("../../middleware/checkAuth");

const router = express.Router();

router.post("/register", ctrlUser.register);
router.post("/login", ctrlUser.login);
router.post("/logout", authMiddleware, ctrlUser.logout);
router.get("/current", authMiddleware, ctrlUser.getCurrentUser);
router.patch("/:id", authMiddleware, ctrlUser.updateSubscription);

module.exports = router;
