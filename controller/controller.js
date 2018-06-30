const ContactGroup = require('../model/contact-group')
const Contact = require('../model/contact')
const Group = require('../model/group')
const View = require('../view/view')
const Setup = require('../setup')


class Controller {
  static setupDB() {
    Setup.create().then(result => {
      console.log("sada",result)
      View.printMessage(result)
    }).catch (err => {
      View.printError(err)
    })
  }

  static showHelp(){
    const output = `node main.js help\nnode main.js setup\nnode main.js contact import contacts.csv\nnode main.js group import groups.csv\nnode main.js contact-group import contact-groups.csv\nnode main.js contact create <name> <company> <phone> <email>\nnode main.js contact update <id> <name> <company> <phone> <email>\nnode main.js contact delete id\nnode main.js contact show\nnode main.js contact assign <contacId> <groupId>\nnode main.js group create <name>\nnode main.js group update <id> <name>\nnode main.js group delete id\nnode main.js group show`
    View.printMessage(output)
  }

  static importContacts(fileName) {
    Contact.importContacts(fileName).then(result => {
      View.printMessage(result)
    })
    .catch (err => {
      View.printError(err)
    })
  }

  static importGroups(fileName) {
    Group.importGroups(fileName).then(result => {
      View.printMessage(result)
    })
    .catch (err => {
      View.printError(err)
    })
  }
  
  static importContactsGroups(fileName) {
    ContactGroup.importContactsGroups(fileName).then(result => {
      View.printMessage(result)
    })
    .catch (err => {
      View.printError(err)
    })
  }

  static createContact(name, company, phone, email) {
    Contact.create(name, company, phone, email).then(result => {
      View.printMessage(result)
    })
    .catch (err => {
      View.printError(err)
    })
  }

  static createGroup(name) {
    Group.create(name).then(result => {
      View.printMessage(result)
    })
    .catch (err => {
      View.printError(err)
    })
  }

  static deleteContact(id) {
    //first delete in conjunction table, then delete in contact table
    ContactGroup.deleteByContact(id).then(resultDeleteGroup => {
      Contact.delete(id).then (resultDeleteContact => {
        View.printMessage(resultDeleteContact)
      }).catch (err => {
        View.printError(err)
      })
    })
    .catch (err => {
      View.printError(err)
    })
  }

  static deleteGroup(id) {
    //first delete in conjunction table, then delete in group table
    ContactGroup.deleteByGroup(id).then(resultDeleteGroup => {
      Group.delete(id).then (resultDeleteGroup => {
        View.printMessage(resultDeleteGroup)
      }).catch (err => {
        View.printError(err)
      })
    })
    .catch (err => {
      View.printError(err)
    })
  }

  static updateContact(id,name, company, phone, email) {
    Contact.update(id, name, company, phone, email).then (result => {
      View.printMessage(result)
    }).catch (err => {
      View.printError(err)
    })
  }

  static updateGroup (id,name) {
    Group.update(id, name).then (result => {
      View.printMessage(result)
    }).catch (err => {
      View.printError(err)
    })
  }

  static showContacts () {
    Contact.show().then (result => {
      View.printTable(result)
    }).catch (err => {
      View.printError(err)
    })
  }

  static showGroups () {
    Group.show().then (result => {
      View.printTable(result)
    }).catch (err => {
      View.printError(err)
    })
  }

  static assignContactGroup (contactId, groupId) {
    ContactGroup.create(contactId,groupId).then (result => {
      View.printMessage(result)
    }).catch (err => {
      View.printError(err)
    })
  }

  static wrongCommand () {
    View.printMessage("Command not found, please run node main.js help")
  }
}

module.exports = Controller