const fs = require('fs');
const db = require('./db.js');


class Contact {
    constructor(name, company_name, phone_number, email) {
        this.id = null
        this.name = name
        this.company_name = company_name
        this.phone_number = phone_number
        this.email = email
    }

    static transferContacts() {
        return new Promise((resolve, reject) => {
            let contacts = JSON.parse(fs.readFileSync('datacontacts.JSON', 'utf8'));
            for (let i = 0; i < contacts.length; i++) {
                const queryInput = `INSERT INTO Contacts (name, company_name, phone_number, email)
                                VALUES ("${contacts[i].name}", "${contacts[i].company_name}", "${contacts[i].phone_number}", "${contacts[i].email}")`
                db.serialize(function () {
                    db.run(queryInput, function (errTransfer) {
                        if (errTransfer) {
                            reject(errTransfer)
                        } else {
                            resolve(`Contacts data successfully transferred into database`)
                        }
                    })
                })
            }
        })
    }

    static createContact(name, company_name, phone_number, email) {
        return new Promise((resolve, reject) => {
            // let contact = new Contact(name, company_name, phone_number, email)
            const queryInput = `INSERT INTO Contacts (name, company_name, phone_number, email)
                            VALUES ("${name}", "${company_name}", "${phone_number}", "${email}")`

            db.run(queryInput, function (errCreate) {
                if (errCreate) {
                    reject(errCreateContact)
                } else {
                    resolve(`Data contact has been added with id: ${this.lastID} - ${name}`)
                }
            })
        })

    }


    static updateContact(id, name, company_name, phone_number, email) {
        return new Promise((resolve, reject) => {
            const queryUpdate = `UPDATE Contacts
                                SET name = "${name}",
                                  company_name = "${company_name}",
                                  phone_number = "${phone_number}",
                                  email = "${email}"
                              WHERE id = ${id}`
            db.run(queryUpdate, function (errUpdate) {
                if (errUpdate) {
                    reject(errUpdate)
                } else {
                    resolve(`Data contact "${name}" has been updated`)
                }
            })
        })

    }

    static deleteContact(id, name) {
        return new Promise((resolve, reject) => {
            const queryDelete = `DELETE FROM Contacts
                             WHERE id = ${id} AND name = "${name}"`

            db.run(queryDelete, function (errDelete) {
                if (errDelete) {
                    reject(errDelete)
                } else {
                    resolve(`Contact "${name}" has been deleted from address book`)
                }

                const queryUpdate = `UPDATE ContactGroup
                                 SET contactId = NULL
                                 WHERE contactId = ${id}`

                db.run(queryUpdate, function (errUpdate) {
                    if (errUpdate) {
                        reject(errUpdate)
                    } else {
                        resolve(this.changes)
                    }
                })
            })
        })
    }

    static showContact(id) {
        return new Promise((resolve, reject) => {
            const queryShow = `SELECT Contacts.name, Contacts.company_name, Contacts.phone_number, Contacts.email, Groups.name AS groupName 
                           FROM Contacts 
                           LEFT JOIN ContactGroup 
                                ON Contacts.id = ContactGroup.contactId 
                           LEFT JOIN Groups 
                                ON ContactGroup.groupId = Groups.id 
                            WHERE Contacts.id = ${id}`


            db.all(queryShow, function (errShow, dataContact) {
                if (errShow) {
                    reject(errShow)
                } else {
                    resolve(dataContact)
                }
            })
        });
    }


    static assignContact(ContactName, GroupName) {
        return new Promise((resolve, reject) => {
            const queryContactId = `SELECT id AS ContactId FROM Contacts
                                WHERE name = "${ContactName}"`

            const queryGroupId = `SELECT id AS GroupId FROM Groups
                              WHERE name = "${GroupName}"`


            db.get(queryContactId, function (err, dataContact) {
                if (err) {
                    reject(err)
                } else {
                    resolve(dataContact)
                }
                db.get(queryGroupId, function (err, dataGroup) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(dataGroup)
                    }
                    const queryInsertJoin = `INSERT INTO ContactGroup (contactId, groupId)
                              VALUES ("${dataContact.ContactId}", "${dataGroup.GroupId}")`

                    db.run(queryInsertJoin, function (err, data) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    })
                })
            })
        })
    }
}

module.exports = Contact;