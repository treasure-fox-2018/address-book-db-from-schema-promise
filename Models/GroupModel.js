//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');
db.get("PRAGMA foreign_keys = ON")

class Group {
  constructor(groupname) {
    this.groupname = groupname
  }

  save() {
    let gn = this.groupname
    let query = `INSERT INTO Groups (groupname) VALUES ('${this.groupname}')`
    return new Promise(function (resolve, reject) {
      db.run(query, err => {
        if (err) {
          reject(err)
        } else {
          resolve(gn)
        }
      })
    })

  }


  update(id, param, value) {
    return new Promise(function (resolve, reject) {
      db.run(`UPDATE Groups SET '${param}'=  '${value}' WHERE  id = '${id}'`, function (err) {
        if (err) reject(err)
        resolve(id)
      })
    })
  }
  //

  delete(id) {
    return new Promise(function (resolve, reject) {
      let query = `DELETE FROM Groups where id = '${id}'`;
      db.all(`select groupname from Groups WHERE id = '${id}'`, function (err, data) {
        if (err) reject(err)
        db.run(query, function (err) {
          if (err) reject(err)
          resolve(data[0].groupname)
          let queryconjungtion = `delete from GroupContacts WHERE id_group = '${id}'`
          db.run(queryconjungtion, function (err) {
            if (err) {
              reject(err)
            }
          })
        })
      })
    })


  }
  //

  ShowGroup() {
    let query = `select groupname, name, company, phone, email from Groups LEFT JOIN GroupContacts ON
Groups.id = GroupContacts.id_group
LEFT JOIN Contacts ON
Contacts.id = GroupContacts.id_contact`

    return new Promise(function (resolve, reject) {
      db.all(query, function (err, data) {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }





}

module.exports = Group
