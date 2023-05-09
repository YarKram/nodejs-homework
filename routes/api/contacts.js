const express = require("express");

const ctrlContact = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlContact.getAll);
router.get("/:id", ctrlContact.getById);
router.post("/", ctrlContact.create);
router.delete("/:id", ctrlContact.remove);
router.put("/:id", ctrlContact.update);
router.patch("/:id/favorite", ctrlContact.updateStatus);

module.exports = router;
