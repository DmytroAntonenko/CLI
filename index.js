const contactsApi = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
.option("-a, --action <type>", "choose action")
.option("-i, --id <type>", "contact id")
.option("-n, --name <type>", "contact name")
.option("-e, --email <type>", "contact email")
.option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();



const invokeAction = async ({ action, id, name, email, phone })=> {
  switch (action) {
    case "list":
      const allContacts = await contactsApi.listContacts();
      console.table(allContacts);
      break;
  
    case "get":
      const contactById = await contactsApi.getContactById(id);
      console.log(contactById);
      break;
  
    case "add":
      const newContact = await contactsApi.addContact(name, email, phone);
      console.log("Contact was added", newContact);
      break;
  
    case "remove":
      const removeContact = await contactsApi.removeContact(id);
      console.log(`Contact with Id=${id} was removed`);
      break;
  
    default:
      console.warn("\x1B[31m Unknown action type!");
    }
  }
  
invokeAction(argv);
