const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contacts } = require("../../controllers");
const { joiSchema, favoriteSchema } = require("../../models/contact");
const router = express.Router();

router.get("/", ctrlWrapper(contacts.getAll));

router.get("/:id", ctrlWrapper(contacts.getById));

router.post("/", validation(joiSchema), ctrlWrapper(contacts.add));

router.put("/:id", validation(joiSchema), ctrlWrapper(contacts.updateById));

router.patch(
	"/:id/favorite",
	validation(favoriteSchema),
	ctrlWrapper(contacts.updateStatusContact)
);
router.delete("/:id", ctrlWrapper(contacts.removeById));

module.exports = router;
