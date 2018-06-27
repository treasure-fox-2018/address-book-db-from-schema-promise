const db = require('../db');
db.get("PRAGMA foreign_keys = ON");

class Contact {

  static create(name, company, phone, email) {
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO Contacts VALUES (null, "${name}", "${company}", "${phone}", "${email}")`);
      resolve();
    });
  }

  static update(id, columnName, value) {
     return new Promise(function(resolve, reject) {
      db.get(`SELECT id FROM Contacts WHERE id = "${id}"`, (err, data) => {
        if (err) reject()
        db.run(`UPDATE Contacts SET ${columnName} = "${value}" WHERE id = ${data.id}`);
        resolve()
      })
    })
  }

  static delete(id) {
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM ContactsGroups WHERE contactId = "${id}"`, function (err) {
        if (err) {reject()}
      });
      db.run(`DELETE FROM Contacts WHERE id = "${id}"`, function (err) {
        if (err) {reject()}
      });
      resolve()
    });
  }

  static show() {
    return new Promise(function(resolve, reject) {
      db.all(`SELECT Contacts.id, Contacts.company_name, Contacts.phone_number, Contacts.email_address, Groups.group_name FROM Contacts, ContactsGroups, Groups
        WHERE Contacts.id = ContactsGroups.contactId AND ContactsGroups.groupId = Groups.id`, (err, data) => {
          if (err) throw err;
          resolve(data);
        });
    });
  }
}

module.exports = Contact;
