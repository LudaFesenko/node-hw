const argv = require("yargs").argv;

const contacts = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts, ["id", "name", "email", "phone"]);
      break;

    case "get":
      const getContact = await contacts.getContactById(id);
      console.table(getContact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removeFromContact = await contacts.removeContact(id);
      console.table(removeFromContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
