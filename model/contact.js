const Contact = require("../contact");
const db = require("../db");

class ContactModel {
  static insert(name, perusahaan, number_phone, email) {
    return new Promise((resolve, reject) => {
      const contact = new Contact(name, perusahaan, number_phone, email);
      const queryInsertContact = `INSERT INTO Contacts (name, perusahaan, number_phone, email)
                                VALUES (
                                  "${contact.name}", 
                                  "${contact.perusahaan}", 
                                  "${contact.number_phone}", 
                                  "${contact.email}"
                                )`;

      db.run(queryInsertContact, (err, data) => {
        if (err) {
          const messageErr = `Contact already exists`;
          // callback(messageErr);
          reject(messageErr);
        } else {
          const queryCountData = `SELECT COUNT(*) AS countDataContact 
                                  FROM Contacts`;
          db.all(queryCountData, (err, data) => {
            if (err) throw err;
            const message = `Contact name ${
              contact.name
            } success add to database. Total Contacts: ${
              data[0].countDataContact
            }`;
            // callback(message);
            resolve(message);
          });
        }
      });
    });
  }

  static update(id, name, perusahaan, number_phone, email) {
    return new Promise((resolve, reject) => {
      const contact = new Contact(name, perusahaan, number_phone, email);
      const queryUpdateContact = `UPDATE Contacts 
                                  SET name = "${contact.name}", 
                                      perusahaan = "${contact.perusahaan}", 
                                      number_phone = "${contact.number_phone}", 
                                      email = "${contact.email}" 
                                  WHERE id = ${id} `;

      db.run(queryUpdateContact, (err, data) => {
        if (err) {
          // throw err;
          reject(err)
        } else {
          const message = `Update contacts id ${id} successfully`;
          // callback(message);
          resolve(message)
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const queryDeleteContact = `DELETE FROM Contacts WHERE id = ${id}`;
      db.run(queryDeleteContact, (err, data) => {
        if (err) reject(err);
        const queryCountData = `SELECT COUNT(*) AS countDataContact FROM Contacts`;
        db.all(queryCountData, (err, data) => {
          if (err) reject(err);
          const message = `Contact name id ${id} success delete to database. Total Contacts: ${
            data[0].countDataContact
          }`;
          // callback(message);
          resolve(message);
        });
      });
    });
  }

  static showContact() {
    return new Promise((resolve, reject) => {
      const queryShowContact = `SELECT contact_name, email, perusahaan, numberPhone, Groups.nameGroup FROM GroupContacts , (
        SELECT Contacts.name AS contact_name, GroupContacts.contact_id, 
          Contacts.email AS email, 
          Contacts.perusahaan AS perusahaan, 
          Contacts.number_phone AS numberPhone
          FROM Contacts
          JOIN GroupContacts
          ON Contacts.id = GroupContacts.contact_id
          GROUP BY contact_id
        ) AS contactGroup
        INNER JOIN Groups
        ON Groups.id = GroupContacts.group_id
        WHERE GroupContacts.contact_id = contactGroup.contact_id`;
      db.all(queryShowContact, (err, data) => {
        if (err) reject(err);
        const message = data;
        // callback(message);
        resolve(message);
      });
    });
  }
}

module.exports = ContactModel;
