const db = require("./db")
const fs = require("fs")

class DataContacts {
  static insertData () {
    return new Promise ((resolve, reject) => {
      db.serialize(() => {
        const data = fs.readFileSync("./data_contact.csv", "utf-8").split("\n")
        
        for (let i = 1; i < data.length; i++) {
          let dataSplit = data[i].split(",")
          let name = dataSplit[0]
          let perusahaan = dataSplit[1]
          let number_phone = dataSplit[2]
          let email = dataSplit[3]
  
          const queryInsert = `INSERT INTO Contacts (name, perusahaan, number_phone, email)
                              VALUES ("${name}","${perusahaan}","${number_phone}","${email}")`
          db.run(queryInsert, (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve("Data Contacts successfully add to database")
            }
          })
        }
      })
    })
  }
}

class DataGroups {
  static insertData () {
    return new Promise ((resolve, reject) => {
      db.serialize(() => {
        const data = fs.readFileSync("./data_group.csv", "utf-8").split("\n")
  
        for (let i = 1; i < data.length; i++) {
          const queryInsert = `INSERT INTO Groups (nameGroup) VALUES ("${data[i]}")`
          db.run(queryInsert, (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve("Data Groups successfully add to database")
            }
          })
        }

      })
    })
  }
}

class DataGroupContacts {
  static insertData () {
    return new Promise ((resolve, reject) => {
      db.serialize(() => {
        const data = fs.readFileSync("./data_group_contact.csv", "utf-8").split("\n")
        for (let i = 1; i < data.length; i++) {
          let dataSplit = data[i].split(",")
          let contact_id = dataSplit[0]
          let group_id = dataSplit[1]
  
          const queryInsert = `INSERT INTO GroupContacts (contact_id, group_id) 
                              VALUES (
                                "${contact_id}",
                                "${group_id}"
                              )`
          db.run(queryInsert, (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve("Data Groups successfully add to database")
            }
          })
          
        }
      })
    })
  }
}

DataContacts.insertData()
  .then(message => console.log(message))
  .catch(err => console.log("Message error: ", err))

DataGroups.insertData()
  .then(message => console.log(message))
  .catch(err => console.log("Message error: ", err))

DataGroupContacts.insertData()
  .then(message => console.log(message))
  .catch(err => console.log("Message error: ", err))


module.exports = DataContacts, DataGroups, DataGroupContacts