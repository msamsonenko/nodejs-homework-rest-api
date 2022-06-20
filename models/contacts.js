const fs = require("fs/promises");
const { v4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const updateAllContacts = async (contacts) => {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contact = contacts.find((item) => item.id === contactId);
	if (!contact) {
		return null;
	}
	return contact;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const contactIdx = contacts.findIndex((item) => item.id === contactId);
	if (contactIdx === -1) {
		return null;
	}
	const [contactToRemove] = contacts.splice(contactIdx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return contactToRemove;
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = { ...body, id: v4() };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === contactId);
	if (idx === -1) {
		return null;
	}
	contacts[idx] = { name, email, phone, contactId };
	updateAllContacts(contacts);
	return contacts[idx];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
