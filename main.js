const argv = process.argv
const Controller = require('./controller/controller')

let table = argv[2]
let command = argv[3]

if ( argv[2] == 'help') {
  Controller.showHelp()
} else if (argv[2] == 'setup') {
  Controller.setupDB()
} else if(table == 'contact') {
  if(command == 'import') {
    const fileName = argv[4]
    Controller.importContacts(fileName)
  } else if(command == 'create') {
    const name = argv[4]
    const company = argv[5]
    const phone = argv[6]
    const email = argv[7]
    Controller.createContact(name, company, phone, email)
  } else if(command == 'update') {
    const id = argv[4]
    const name = argv[5]
    const company = argv[6]
    const phone = argv[7]
    const email = argv[8]
    Controller.updateContact(id,name,company,phone,email)
  } else if(command == 'delete') {
    const id = argv[4]
    Controller.deleteContact(id)
  } else if (command == 'show') {
    Controller.showContacts()
  } else if (command == 'assign') {
    const contactId = argv[4]
    const groupId = argv[5]
    Controller.assignContactGroup(contactId,groupId)
  } else Controller.showHelp()

} else if(table == 'group') {
  if(command == 'import') {
    const fileName = argv[4]
    Controller.importGroups(fileName)
  } else if(command == 'create') {
    const name = argv[4]
    Controller.createGroup(name)
  } else if(command == 'update') {
    const id = argv[4]
    const name = argv[5]
    Controller.updateGroup(id,name)
  } else if(command == 'delete') {
    const id = argv[4]
    Controller.deleteGroup(id)
  } else if (command == 'show') {
    Controller.showGroups()
  } else Controller.showHelp()

} else if (table == 'contact-group') {
  if(command == 'import') {
    const fileName = argv[4]
    Controller.importContactsGroups(fileName)
  } else Controller.showHelp()
} else Controller.showHelp()

