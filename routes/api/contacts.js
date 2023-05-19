const express = require("express");

const ctrlContact = require("../../controllers/contacts");
const authMiddleware = require("../../middleware/checkAuth");

const router = express.Router();

router.get("/", authMiddleware, ctrlContact.getAll);
router.get("/:id", authMiddleware, ctrlContact.getById);
router.post("/", authMiddleware, ctrlContact.create);
router.delete("/:id", authMiddleware, ctrlContact.remove);
router.put("/:id", authMiddleware, ctrlContact.update);
router.patch("/:id/favorite", authMiddleware, ctrlContact.updateStatus);

module.exports = router;
