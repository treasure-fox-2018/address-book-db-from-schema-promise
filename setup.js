const db = require("./db")

class Setup {
  static createTableContact () {
    return new Promise ((resolve, reject) => {
      const queryTableContact = `CREATE TABLE IF NOT EXISTS Contacts (
                                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                  name VARCHAR(100), 
                                  perusahaan VARCHAR (100), 
                                  number_phone INTEGER UNIQUE, 
                                  email VARCHAR(100) UNIQUE
                                )`
      
      db.serialize(() => {
        db.run(queryTableContact, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve("Create Table Contacts Success")
          }
        })
      })
    })
  }

  static createTableGroup () {
    return new Promise ((resolve, reject) => {
      const queryTableGroup = `CREATE TABLE IF NOT EXISTS Groups (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                nameGroup VARCHAR(100)
                              )`
      db.run(queryTableGroup, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve("Create Table Groups Success")
        }
      })
    })
  }

  static createTableGroupContact () {
    return new Promise ((resolve, reject) => {
      const queryTableGroupContact = `CREATE TABLE IF NOT EXISTS GroupContacts (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                        contact_id INTEGER, 
                                        group_id INTEGER,
                                        FOREIGN KEY(contact_id) REFERENCES Contacts(id), 
                                        FOREIGN KEY(group_id) REFERENCES Groups(id)
                                      )`

      db.run(queryTableGroupContact, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve("Create Table Group Contacts Success")
        }
      })
    })
  }
}

Setup.createTableContact()
  .then(message => {
    console.log(message);
  })
  .catch(err => {
    console.log("Message error: ", err);
  })

Setup.createTableGroup()
  .then(message => {
    console.log(message);
  })
  .catch(err => {
    console.log("Message error: ", err);
  })

Setup.createTableGroupContact()
  .then(message => {
    console.log(message);
  })
  .catch(err => {
    console.log("Message error: ", err);
  })

module.exports = Setup