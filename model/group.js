const fs = require('fs')
const db  = require('../db')
db.get("PRAGMA foreign_keys = ON")

class Group {

  static importGroups(fileName,callback) {
    return new Promise ((resolve,reject) => {
      let arrGroups = fs.readFileSync('groups.csv').toString().split("\n");
      arrGroups.shift()
      db.serialize(function() {
        let stmt = db.prepare("INSERT INTO Groups (name) VALUES (?)", function (err) {
          if (err) reject (err)
        })
        for (let i = 0; i < arrGroups.length-1; i++) {
          const name = arrGroups[i]
          stmt.run(name, function (err) {
            if (err) reject (err)
          })
        }
        stmt.finalize(function (err) {
          if (err) reject (err)
          else resolve (`${this.lastID} data from ${fileName} successfully imported to database`)
        })
      })
    })
  }

  static create(name) {
    return new Promise ((resolve,reject) => {
      const query = `INSERT INTO Groups (name) VALUES ("${name}")`
      db.run(query, function (err) {
        if (err) reject (err)
        else resolve (`new data group successfully added with id ${this.lastID}`)
      })
    })
  }

  static delete(id){
    return new Promise ((resolve,reject) => {
      const query = `DELETE FROM Groups WHERE id=${id}`
      db.run(query, function (err) {
        if (err) reject(err)
        else resolve (`data group id ${id} successfully deleted`)
      })
    })
  }

  static update(id, name) {
    return new Promise ((resolve,reject) => {
      const query = `UPDATE Groups
                      SET name = "${name}"
                      WHERE id= ${id}`
      db.run (query, function (err) {
        if (err) reject (err)
        else resolve (`data group id ${id} successfully updated`)
      })
    })
  }

  static show () {
    return new Promise ((resolve,reject) => {
      db.all(`SELECT * FROM Groups`, function (err,data) {
        if (err) reject (err)
        else resolve (data)
      })
    })
  }
}

module.exports = Group