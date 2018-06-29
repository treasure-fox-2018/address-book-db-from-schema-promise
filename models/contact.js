const db = require('../db');
const fs = require('fs');
const ContactGroup = require('./contact-group');

db.get("PRAGMA foreign_keys = ON")

class Contact {
  static csvToDatabase() {
    return new Promise((resolve, reject) => {
      let contactCsv = fs.readFileSync('./person.csv', 'utf8').split('\n');

      for (var i = 1; i <= contactCsv.length - 1; i++) {
        let dataCsv = contactCsv[i].split(',');
        let queryTransfer = `INSERT INTO contacts (name, company, phone_number, email) VALUES ("${dataCsv[1]}", "${dataCsv[2]}", "${dataCsv[3]}", "${dataCsv[4]}")`;

        db.serialize(() => {
          db.run(queryTransfer, function (errTransferContact) {
            if (errTransferContact) {
              reject(errTransferContact);
            }
            else {
              resolve(`Data Contact has Successfully Added!`)
            }
          });
        });
      }
    })
  }

  static createData(parameter) {
    return new Promise((resolve, reject) => {
      let queryCreate = `INSERT INTO contacts (name, company, phone_number, email) 
                       VALUES ("${parameter[0]}", "${parameter[1]}", "${parameter[2]}", "${parameter[3]}")`;

      db.run(queryCreate, function (errCreateContact) {
        if (errCreateContact) {
          reject(errCreate);
        }
        else {
          resolve(`Data Contacts has successfully added with id ${this.lastID}`);
        }
      })
    })
  }

  static showDatabase() {
    return new Promise((resolve, reject) => {
      let queryAdd = `SELECT contacts.id, contacts.name, contacts.company, contacts.phone_number, contacts.email, dataBaru.group_name from contact_group,
                    (SELECT contact_group.group_id, groups.id, groups.name AS group_name FROM groups LEFT JOIN contact_group on
                    groups.id = contact_group.group_id group by group_id) AS dataBaru
                    LEFT JOIN contacts on contact_group.contact_id = contacts.id
                    WHERE contact_group.group_id = dataBaru.id
                    ORDER BY dataBaru.group_name`;

      db.all(queryAdd, function (errRead, dataContact) {
        if (errRead) {
          reject(errRead);
        }
        else {
          resolve(dataContact);
        }
      })
    })
  }

  static updateDataContact(parameter) {
    return new Promise((resolve, reject) => {
      let queryUpdate = `UPDATE contacts SET ${parameter[1]} = "${parameter[2]}" WHERE id = "${parameter[0]}"`;

      db.run(queryUpdate, function (errUpdate) {
        if (errUpdate) {
          callback("Error Message :", errUpdate);
        }
        else {
          callback(true, this.changes);
        }
      })
    })
  }

  static deleteDataContact(parameter) {
    return new Promise((resolve, reject) => {
      let queryDelete = `DELETE FROM contacts WHERE id = "${parameter[0]}"`;

      ContactGroup.updateToNullContact(parameter)
        .then(outputUpdate => {
          db.run(queryDelete, (errDeleteContact) => {
            if (errDeleteContact) {
              reject(errDeleteContact);
            }
            else {
              resolve(this.changes);
            }
          })
        })

        .catch(failed => {
          reject(failed)
        })
    })
  }
}

module.exports = Contact