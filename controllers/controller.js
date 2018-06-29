const Contacts = require('../models/contact');
const ContactsGroup = require('../models/contact-group');
const Groups = require('../models/group');
const Views = require('../views/view');

class Controller {
  static csvToDatabaseContacts () {
    Contacts.csvToDatabase ()
      .then (outputContacts => {
        Views.displayMessage(outputContacts);
      })

      .catch (failed => {
        Views.displayError(err, output);
      })
  }

  static createDataContact (parameter) {
    Contacts.createData(parameter)
      .then(outputCreateContact => {
        Views.displayMessage(outputCreateContact);
      })

      .catch (failed => {
        Views.displayError(failed)
      })
  }

  static showDatabaseContacts() {
    Contacts.showDatabase()
      .then (outputShowContacts => {
        Views.showDatabaseContacts(outputShowContacts)
      })

      .catch (failed => {
        Views.displayError(err, output)
      })
  }

  static updateDataContact (parameter) {
    Contacts.updateDataContact (parameter)
      .then (outputUpdateContact => {
        Views.updateDataContact(outputUpdateContact)
      })

      .catch (failed => {
        Views.displayError(failed)
      })
  }

  static deleteDataContact (parameter) {
    Contacts.deleteDataContact (parameter)
      .then (outputDeleteContact => {
        Views.deleteDataContact(outputDeleteContact);
      }) 

      .catch (failed => {
        Views.displayError(failed)
      })
  }

  //--------------GROUP-------------------------------------------


  static csvToDatabaseGroup () {
    Groups.csvToDatabase ()
      .then (outputTransferGroup => {
        Views.displayMessage(outputTransferGroup);
      })

      .catch (failed => {
        Views.displayError(failed);
      })
  }

  static createDataGroup (parameter) {
    Groups.createData(parameter, function(err, output){
      if(err === "Error Message :") {
        Views.displayError(err, output)
      }
      else {
        Views.displayMessage(output);
      }
    })
  }

  static showDatabaseGroups() {
    Groups.showDatabase(function(err, output) {
      if(err === "Error Message :") {
        Views.displayError(err, output)
      }
      else {
        Views.showDatabaseGroups(output)
      }
    });
  }


  static updateDataGroup(parameter) {
    Groups.updateGroup(parameter)
      .then (outputUpdateGroup => {
        Views.updateDataGroups(outputUpdateGroup)
      })

      .catch (failed => {
        Views.displayError(output)
      })
  }

  static deleteDataGroup () {
    Groups.deleteGroup (parameter)
      .then (outputDeleteGroup => {
        Views.deleteDataGroup(outputDeleteGroup);
      })

      .catch (failed => {
        Views.displayError(failed)
      })
  }

  //---------CONTACT-GROUP------------------------------------------------

  static csvToDatabaseContactGroup () {
    ContactsGroup.csvToDatabase ()
      .then (outputTransfer => {
        Views.displayMessage(outputTransfer);
      })

      .catch (failed => {
        Views.displayError(failed);
      })
  }

  static createDataContactGroup (parameter) {
    ContactsGroup.createData(parameter)
      .then(outputCreate => {
        Views.displayMessage(outputCreate)
      })
        
      .catch(failed => {
        Views.displayError(failed.message);
      })
  }

  static updateDataContactGroup(parameter) {
    ContactsGroup.updateDataContactGroup(parameter)
      .then(outputUpdate => {
        Views.updateDataContactGroup(outputUpdate)
      })

      .catch (failed => {
        Views.displayError(failed)
      })
  }

  static deleteDataContactGroup (parameter) {
    ContactsGroup.deleteDataContactGroup (parameter)
      .then (outputDelete => {
        Views.deleteDataContactGroup(outputDelete);
      })

      .catch (failed => {
        Views.displayError(failed)
      })

  }
}


module.exports = Controller;