const view = require('./view');
const contactGroup = require('./model/contact-group');
const contact = require('./model/contact');
const group = require('./model/group');

class Controller {
  static createContact(name, company, phone, email) {
    contact.create(name, company, phone, email).then(() => {
      view.showMessage("Successfully created data");
    });
  }

  static updateContact(id, columnName, value) {
    contact.update(id, columnName, value).then(() => {
      view.showMessage("Successfully updated data");
    })
    .catch(() => {
      view.showMessage("no matching data");
    });
  }

  static deleteContact(id) {
    contact.delete(id).then(() => {
      view.showMessage("Successfully deleted data");
    })
    .catch(() => {
      view.showMessage("no matching data")
    })
  }
//
  static showContacts() {
    contact.show().then((data) => {
      view.showMessage(data);
    })
  }
//
  static createGroup(name) {
    group.create(name).then(() => {
      view.showMessage("Successfully created data");
    })
  }
//
  static updateGroup(id, columnName, value) {
    group.update(id, columnName, value).then(() => {
      view.showMessage("Successfully updated data");
    })
  }
//
  static deleteGroup(id) {
    group.delete(id).then(() => {
      view.showMessage("Successfully deleted data");
    })
  }
//
  static showGroups() {
    group.show().then((data) => {
      view.showMessage(data);
    })
  }
//
  static createContactGroup(contactId, groupId) {
    contactGroup.create(contactId, groupId).then(() => {
      view.showMessage("Successfully created data");
    })
  }

  static updateContactGroup(id, columnName, value) {
    contactGroup.update(id, columnName, value).then(() => {
      view.showMessage("Successfully updated data");
    });
  }

  static deleteContactGroup(id) {
    contactGroup.delete(id).then(() => {
      view.showMessage("Successfully deleted data");
    })
  }
}

module.exports = Controller;
