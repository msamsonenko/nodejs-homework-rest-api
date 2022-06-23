const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contacts } = require("../../controllers");
const { joiSchema, favoriteSchema } = require("../../models/contact");
const router = express.Router();

// router.get("/", ctrlWrapper(contacts.getAll));
router.get("/", async (req, res, next) => {
	try {
		const contactList = await contacts.getAll();
		res.json(contactList);
	} catch (error) {
		next(error);
	}
});
// router.get("/:id", ctrlWrapper(contacts.getById));
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contacts.getById(id);
		res.json(contact);
	} catch (error) {
		next(error);
	}
});
// router.post("/", validation(joiSchema), ctrlWrapper(contacts.add));
router.post("/", async (req, res, next) => {
	try {
		const result = await contacts.add(req.body);
		res.json(result);
	} catch (error) {
		next(error);
	}
});
// router.put("/:id", validation(joiSchema), ctrlWrapper(contacts.updateById));
router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contacts.updateById(id, req.body);
		res.json(contact);
	} catch (error) {
		next(error);
	}
});
router.patch(
	"/:id/favorite",
	validation(favoriteSchema),
	ctrlWrapper(contacts.updateFavorite)
);
router.delete("/:id", ctrlWrapper(contacts.removeById));

module.exports = router;
