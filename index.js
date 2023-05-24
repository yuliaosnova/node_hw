const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, name, email, phone, id }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone, id });
      return console.log(newContact);
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
    default:
      return console.warn("Unknown action!");
  }
};

program
  .option("-a, --action, <type>", "choose action")
  .option("-i, --id, <type>", "user id")
  .option("-n, --name, <type>", "user name")
  .option("-e, --email, <type>", "user email")
  .option("-p, --phone, <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

console.log(argv);

invokeAction(argv);
