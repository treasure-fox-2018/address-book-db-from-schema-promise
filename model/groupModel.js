const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db')

class Group {
    static insertGroup(name) {
        const queryInsertGroup = `INSERT INTO 'Group'(name) VALUES ('${name}')`
        const querySelectGroup = `SELECT * FROM 'Group'`

        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.run(queryInsertGroup, function(err) {
                    if(err) throw err
                })
    
                db.all(querySelectGroup, function(err, qSelectGroup) {
                    if(err) reject(err)
                    resolve(qSelectGroup[qSelectGroup.length-1])
                })
            })

        })
    }

    static updateGroup(groupUpdate) {
        const queryGroupUpdate = `UPDATE 'Group' SET name = '${groupUpdate[1]}' WHERE id = ${groupUpdate[0]}`
        const selectGroup = `SELECT * FROM 'Group' WHERE id = ${groupUpdate[0]}`

        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.run(queryGroupUpdate)
                db.all(selectGroup, function(err, qSelectGroup) {
                    if(err) reject(err)
                    resolve(qSelectGroup)
                })
            })   
        })
    }

    static showGroup() {
        const queryShowGroup = `SELECT * FROM 'Group'`

        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.all(queryShowGroup, function(err, qShowGroup) {
                    if(err) reject(err)
                    resolve(qShowGroup)
                })
    
            })
        })
    }

    static deleteGroup(idGroup) {
        const queryDeleteGroup = `DELETE FROM 'Group' WHERE id = ${idGroup}`
        const selectDelete = `SELECT * FROM 'Group' WHERE id = ${idGroup}`

        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.all(selectDelete, function(err, qselect) {
                    if(err) reject(err)
                    resolve(qselect[0])
                })
                db.run(queryDeleteGroup)
            })            
        })

    }

}

module.exports = Group