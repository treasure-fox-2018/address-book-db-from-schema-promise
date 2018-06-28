const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db')

class Contact {


    static insertContact(content) {
        // content = [name, company, phone, email]
        const queryInsertContact = `INSERT INTO Contact (name, company, phone, email)
            VALUES('${content[0]}', '${content[1]}', ${content[2]}, '${content[3]}')`
        const queryShow = `SELECT * FROM Contact WHERE name = '${content[0]}'`
        
        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.run(queryInsertContact)
                db.all(queryShow, function(err, qShow) {
                    if(err) reject(err)
                    resolve(qShow[qShow.length-1])
                })
            })
        })
    }

    static updateContact(contentUpdate) {
        const queryContactUpdate = `UPDATE Contact 
        SET name = '${contentUpdate[1]}',
            company = '${contentUpdate[2]}',
            phone = '${contentUpdate[3]}',
            email = '${contentUpdate[4]}'
        WHERE id = '${contentUpdate[0]}'`
        const selectContact = `SELECT * FROM Contact WHERE id = ${contentUpdate[0]}`

        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.run(queryContactUpdate)
                db.all(selectContact, function(err, qSelectContact) {
                    if(err) reject(err)
                    resolve(qSelectContact)
                })
            })
        })
    }

    static showContact() {
        const queryShowContact = `SELECT * FROM Contact`


        return new Promise(function(resolve, reject) {

            db.serialize(function() {
                db.all(queryShowContact, function(err, qShowContact) {
                    if(err) reject(err)
                    resolve(qShowContact)
                })
            })
        })
    }

    static deleteContact(idContact) {
        const queryDeleteContact = `DELETE FROM Contact WHERE id = ${idContact}`
        const selectDelete = `SELECT * FROM Contact WHERE id = ${idContact}`

        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.all(selectDelete, function(err, qselect) {
                    if(err) reject(err)
                    resolve (qselect[0])
                    db.run(queryDeleteContact)
                })
            })
        })

    }
}

module.exports = Contact