const db = require('../db');
db.get("PRAGMA foreign_keys = ON");

class ContactGroup {

  static create(contactId, groupId) {
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO ContactsGroups VALUES (null, "${contactId}", "${groupId}")`);
      resolve();
    });
  }

  static update(id, columnName, value) {
    return new Promise(function(resolve, reject) {
      db.get(`SELECT id FROM ContactsGroups WHERE id = "${id}"`, (err, data) => {
        if (err) {
          console.log("no matching data");
          reject();
      } else {
        db.run(`UPDATE ContactsGroups SET ${columnName} = "${value}" WHERE id = ${data.id}`);
        resolve();
      }
      });
    });
  }

  static delete(id) {
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM ContactsGroups WHERE id = "${id}"`);
      resolve();
    });
  }
}

module.exports = ContactGroup;
