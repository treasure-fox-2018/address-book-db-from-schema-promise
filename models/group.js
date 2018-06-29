const db = require('../db');
const fs = require('fs');
const ContactGroup = require('./contact-group');
db.get("PRAGMA foreign_keys = ON");

class Group {
  static csvToDatabase() {
    return new Promise((resolve, reject) => {
      let groupCsv = fs.readFileSync('./group.csv', 'utf8').split('\n');

      for (var i = 1; i <= groupCsv.length - 1; i++) {
        let dataCsv = groupCsv[i].split(',');
        let queryTransfer = `INSERT INTO groups (name) VALUES ("${dataCsv[1]}")`;

        db.serialize(function () {
          db.run(queryTransfer, function (errTransferGroup) {
            if (errTransferGroup) {
              reject(errTransferGroup);
            }
            else {
              resolve(`Data Group has Successfully Added!`);
            }
          });
        });
      }
    })
  }

  static createData(parameter) {
    return new Promise((resolve, reject) => {
      let queryCreate = `INSERT INTO groups (name) VALUES ("${parameter[0]}")`;

      db.run(queryCreate, function (errCreateGroup) {
        if (errCreateGroup) {
          reject(errCreateGroup);
        }
        else {
          resolve(`Data Group has successfully added with id ${this.lastID}`);
        }
      })
    })
  }

  static showDatabase() {
    return new Promise((resolve, reject) => {
      let queryAdd = `SELECT * FROM groups`;

      db.all(queryAdd, function (errReadGroup, dataGroup) {
        if (errReadGroup) {
          reject(errReadGroup);
        }
        else {
          resolve(dataGroup);
        }
      })
    })
  }

  static updateDataGroup(parameter) {
    return new Promise((resolve, reject) => {
      let queryUpdate = `UPDATE groups SET ${parameter[1]} = "${parameter[2]}" WHERE id = "${parameter[0]}"`;

      db.run(queryUpdate, function (errUpdateGroup) {
        if (errUpdateGroup) {
          reject(errUpdateGroup);
        }
        else {
          resolve(this.changes);
        }
      })
    })
  }

  static deleteDataGroup(parameter) {
    return new Promise((resolve, reject) => {
      let queryDeleteGroup = `DELETE FROM groups WHERE id = "${parameter[0]}"`;

      ContactGroup.updateToNullGroup(parameter)
        .then(outputNullGroup => {
          db.run(queryDeleteGroup, errDeleteGroup => {
            if (errDeleteGroup) {
              reject(errDeleteGroup);
            }
            else {
              resolve(this.changes);
            }
          })
        })

        .catch(failed => {
          reject(failed);
        })
    })
  }
}

module.exports = Group