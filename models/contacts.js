const fs = require("fs/promises");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const res = await fs.readFile(contactsPath, "utf-8");
	const contacts = JSON.parse(res);
	console.table(contacts);
	return contacts;
};

const getContactById = async (contactId) => {
	const res = await fs.readFile(contactsPath, "utf-8");
	const contacts = JSON.parse(res);
	const contact = contacts.find((contact) => contact.id === contactId);
	return contact;
};

const removeContact = async (contactId) => {
	const res = await fs.readFile(contactsPath, "utf-8");
	const contacts = JSON.parse(res);
	const contactsRemained = contacts.filter(
		(contact) => contact.id !== contactId
	);
	await fs.writeFile(contactsPath, JSON.stringify(contactsRemained, null, 2));
};

const addContact = async (body) => {
	const res = await fs.readFile(contactsPath, "utf-8");
	const contacts = JSON.parse(res);
	contacts.push(body);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const updateContact = async (contactId, body) => {
	const { name, email, phone } = body;
	const res = await fs.readFile(contactsPath, "utf-8");
	const contacts = JSON.parse(res);
	const contactRequested = contacts.find((contact) => contact.id === contactId);
	if (contactRequested) {
		contactRequested.name = name;
		contactRequested.email = email;
		contactRequested.phone = phone;
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return contactRequested;
	}
	return null;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
