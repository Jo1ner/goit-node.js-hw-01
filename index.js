const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContact = await listContacts();
      return console.table(allContact);
      break;

    case "get":
      const idContact = await getContactById(id);
      return console.log(idContact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      return;
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
