const db = require('../db');
const fs = require('fs');
db.get("PRAGMA foreign_keys = ON");

class ContactGroup {
  static createData(parameter) {
    return new Promise((resolve, reject) => {
      let queryCreate = `INSERT INTO contact_group (contact_id, group_id) VALUES ("${parameter[0]}", "${parameter[1]}")`;

      db.run(queryCreate, function (errCreateContactGroup) {
        if (errCreateContactGroup) {
          reject({ message: errCreateContactGroup });
        }
        else {
          resolve(`Data Contact_Group has successfully added with id ${this.lastID}`);
        }
      })
    })
  }

  static updateDataContactGroup(parameter) {
    return new Promise((resolve, reject) => {
      let queryUpdate = `UPDATE contact_group SET ${parameter[1]} = "${parameter[2]}" WHERE id = "${parameter[0]}"`;

      db.run(queryUpdate, function (errUpdateContactGroup) {
        if (errUpdateContactGroup) {
          reject({ message: errUpdateContactGroup });
        }
        else {
          callback(this.changes);
        }
      })
    })
  }

  static updateToNullContact(parameter) {
    return new Promise((resolve, reject) => {
      let queryUpdateToNull = `UPDATE contact_group SET contact_id = NULL WHERE contact_id = "${parameter[0]}"`;

      db.run(queryUpdateToNull, function (errUpdateNullContact) {
        if (errUpdateNullContact) {
          reject({ message: errUpdateNullContact });
        }
        else {
          resolve(this.changes);
        }
      })
    })
  }

  static updateToNullGroup(parameter) {
    return new Promise((resolve, reject) => {
      let queryUpdateToNull = `UPDATE contact_group SET group_id = NULL WHERE group_id = "${parameter[0]}"`;

      db.run(queryUpdateToNull, function (errUpdateNullGroup) {
        if (errUpdateNullGroup) {
          reject({ message: errUpdateNullGroup });
        }
        else {
          resolve(this.changes);
        }
      })
    })
  }

  static deleteDataContactGroup(parameter) {
    return new Promise((resolve, reject) => {
      let queryDeleteContactGroup = `DELETE FROM contact_group WHERE id = "${parameter[0]}"`;

      db.run(queryDeleteContactGroup, function (errDeleteContactGroup) {
        if (errDeleteContactGroup) {
          reject({ message: errDeleteContactGroup });
        }
        else {
          resolve(this.changes);
        }
      })
    })
  }


  static csvToDatabase() {
    return new Promise((resolve, reject) => {
      let group_contactCsv = fs.readFileSync('./group_contact.csv', 'utf8').split('\n');

      for (var i = 1; i <= group_contactCsv.length - 2; i++) {
        let dataCsv = group_contactCsv[i].split(',');
        let queryTransfer = `INSERT INTO contact_group (contact_id, group_id) VALUES ("${dataCsv[1]}", "${dataCsv[0]}")`;

        db.serialize(function () {
          db.run(queryTransfer, function (errTransferDatabaseCG) {
            if (errTransferDatabaseCG) {
              reject(errTransferDatabaseCG);
            }
            else {
              resolve(`Data Contact Group has Successfully Added!`);
            }
          });
        });
      }
    })
  }
}

module.exports = ContactGroup