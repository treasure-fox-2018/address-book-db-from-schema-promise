const db = require("../db");
const ContactGroup = require("../contact-group");

class ModelContactGroup {
  static assign(name, group_name) {
    return new Promise((resolve, reject) => {
      const queryContact = `SELECT id AS contact_id FROM Contacts WHERE name LIKE "%${name}%"`;
      const queryGroup = `SELECT id AS group_id FROM Groups WHERE nameGroup LIKE "%${group_name}%"`;
      db.all(queryContact, (err, data) => {
        if (err) reject(err);
        const contact_id = data[0].contact_id;

        db.all(queryGroup, (err, data) => {
          if (err) reject(err);
          const group_id = data[0].group_id;

          const queryInsert = `INSERT INTO GroupContacts (contact_id, group_id)
                            VALUES ("${contact_id}", "${group_id}")`;
          db.run(queryInsert, (err, data) => {
            if (err) reject(err);
          });
          const message = "Save contact group success";
          resolve(message);
        });
      });
    });
  }

  static update(id, contact_id, group_id) {
    return new Promise((resolve, reject) => {
      const contactGroup = new ContactGroup(contact_id, group_id);
      const queryUpdate = `UPDATE GroupContacts
                          SET contact_id = "${contactGroup.contact_id}",
                              group_id = "${contactGroup.group_id}"
                          WHERE id = ${id}`;
      db.run(queryUpdate, (err, data) => {
        if (err) reject(err);
        const message = `Contact group id ${id} success updated`;
        resolve(message);
      });
    });
  }
}

module.exports = ModelContactGroup;
