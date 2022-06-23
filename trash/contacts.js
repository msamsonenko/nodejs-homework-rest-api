const express = require("express");
const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
} = require("../repository/contacts");

const Joi = require("joi");

const { createError } = require("./utils");

const addUpdateContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

const router = express.Router();

// GET full list of contacts
router.get("/", async (req, res, next) => {
	try {
		const contactList = await listContacts();
		res.json(contactList);
	} catch (error) {
		next(error);
	}
});

// GET one contact by id
router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);

		if (!contact) {
			throw createError(404);
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
});

// POST add a new contact to the list
router.post("/", async (req, res, next) => {
	try {
		const { error } = addUpdateContactSchema.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const newContact = await addContact(req.body);
		res.status(201).json({
			data: newContact,
		});
	} catch (error) {
		next(error);
	}
});

// DELETE remove a contact from contact list
router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contactToDelete = await removeContact(contactId);
		if (!contactToDelete) {
			throw createError(404);
		}
		res.json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
});

// PUT update existing contact by id
router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = addUpdateContactSchema.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const { contactId } = req.params;
		const result = await updateContact(contactId, req.body);
		if (!result) {
			throw createError(404);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
