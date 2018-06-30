const fs = require('fs')
const db  = require('../db')
db.get("PRAGMA foreign_keys = ON")

class ContactGroup {
  
  static importContactsGroups(fileName) {
    return new Promise ((resolve, reject) => {
    let arrContactsGroups = fs.readFileSync('contactsgroups.csv').toString().split("\n");
    arrContactsGroups.shift()
    db.serialize(function() {
        let stmt = db.prepare("INSERT INTO ContactsGroups (contactId,groupId) VALUES (?,?)", function (err) {
          if (err) reject(err)
        })
        for (let i = 0; i < arrContactsGroups.length-1; i++) {
          let data = arrContactsGroups[i].split(",")
          const contactId = data[0]
          const groupId = data[1]
          stmt.run(contactId,groupId, function (err) {
            if (err) reject(err)
          })
        }
        stmt.finalize(function (err) {
          if (err) reject(err)
          else resolve(`${this.lastID} data from ${fileName} successfully imported to database`)
        })
      })
    })
  }

  static create(contactId, groupId) {
    return new Promise ((resolve,reject) => {
      const query = `INSERT INTO ContactsGroups (contactId, groupId) VALUES ("${contactId}", "${groupId}")`
      db.run(query, function (err) {
        if (err) reject(err)
        else resolve(`contact id ${contactId} successfully assigned to group id ${groupId}`)
      })
    })
  }

  static deleteByGroup (groupId) {
    return new Promise ((resolve,reject) => {
      const query = `DELETE FROM ContactsGroups WHERE groupId=${groupId}`
      db.run(query, function (err) {
        if (err) reject(err)
        else resolve(`data group id ${groupId} successfully deleted from contact-group db`)
      })
    })
   
  }

  static deleteByContact (contactId){
    return new Promise ((resolve,reject) => {
      const query = `DELETE FROM ContactsGroups WHERE contactId=${contactId}`
      db.run(query, function (err) {
        if (err) reject(err)
        else resolve(`data contact id ${contactId} successfully deleted from contact-group db`)
      })
    })
  }
}

module.exports = ContactGroup