//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');
db.get("PRAGMA foreign_keys = ON")

class Contact {
  constructor(name, company, phone, email) {
    this.name = name
    this.company = company
    this.phone = phone
    this.email = email
  }

  save() {
    let who = this.name;
    let query = `INSERT INTO Contacts (name, company, phone, email)
        VALUES ('${this.name}', '${this.company}','${this.phone}', '${this.email}')`
    return new Promise(function (resolve, reject) {
      db.run(query, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(who)
        }
      })
    })
  }




  update(id, param, value) {
    return new Promise(function (resolve, reject) {
      db.run(`UPDATE Contacts SET '${param}'=  '${value}' WHERE  id = '${id}'`, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(id)
        }
      })
    })
  }



  delete(id) {
    let query = `DELETE FROM Contacts where id = '${id}'`;
    return new Promise(function (resolve, reject) {
      db.all(`select name from Contacts WHERE id = '${id}'`, function (err, data) {
        if (err) reject(err)
        db.run(query, function (err) {
          if (err) reject(err)
          resolve(data[0].name)
          let queryconjungtion = `delete from GroupContacts WHERE id_contact = '${id}'`
          db.run(queryconjungtion, function (err) {
            if (err) reject(err)
          })
        })
      })
    })
  }



  ShowContact() {
    let query = `select name, company, phone, email, groupname from Contacts
LEFT JOIN GroupContacts ON
GroupContacts.id_contact = Contacts.id
LEFT JOIN Groups ON
Groups.id = GroupContacts.id_group`
    return new Promise(function (resolve, reject) {
      db.all(query, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }






}

module.exports = Contact
