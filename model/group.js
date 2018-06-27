const db = require('../db');
db.get("PRAGMA foreign_keys = ON");

class Group {

  static create(name) {
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO Groups VALUES (null, "${name}")`);
      resolve()
    });
  }

  static update(id, columnName, value) {
    return new Promise(function(resolve, reject) {
      db.get(`SELECT id FROM Groups WHERE id = "${id}"`, (err, data) => {
        if (err) console.log("no matching data");
        db.run(`UPDATE Groups SET ${columnName} = "${value}" WHERE id = ${data.id}`);
      });
      resolve();
    });
  }

  static delete(id) {
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM ContactsGroups WHERE groupId = "${id}"`);
      db.run(`DELETE FROM Groups WHERE id = "${id}"`);
      resolve()
    });
  }

  static show() {
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM Groups`, (err, data) => {
        if (err) throw err;
        resolve(data);
      });
    });
  }
}

module.exports = Group;
