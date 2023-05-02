const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactById = String(contactId);
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactById);
    return result || null;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  const contactById = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactById);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const addNewContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(addNewContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return addNewContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
