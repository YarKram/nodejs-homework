const express = require("express");

const {
	getAllContacts,
	getContactByIdController,
	postContactController,
	deleteContactByIdController,
	putContactByIdController,
} = require("../../controllers");

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getContactByIdController);
router.post("/", postContactController);
router.delete("/:id", deleteContactByIdController);
router.put("/:id", putContactByIdController);

module.exports = router;
