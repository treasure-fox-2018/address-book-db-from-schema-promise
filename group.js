const fs = require('fs');
const db = require('./db.js');


class Group {
    constructor(name) {
        this.id = null
        this.name = name
    }

    static transferGroups() {
        return new Promise((resolve, reject) => {
            let groups = JSON.parse(fs.readFileSync('datagroups.JSON', 'utf8'));
            for (let i = 0; i < groups.length; i++) {
                const queryInput = `INSERT INTO Groups (name)
                                    VALUES ("${groups[i].name}")`
                db.serialize(function () {
                    db.run(queryInput, function (errTransfer) {
                        if (errTransfer) {
                            reject(errTransfer)
                        } else {
                            resolve(`Groups data successfully transferred into database`)
                        }
                    })
                })
            }
        })

    }

    static createGroup(name) {
        return new Promise((resolve, reject) => {
            // let group = new Group(name)
            // console.log(group);
            const queryInput = `INSERT INTO Groups (name)
                            VALUES ("${name}")`

            db.run(queryInput, function (errCreate) {
                if (errCreate) {
                    reject(errCreate)
                } else {
                    resolve(`Group data has been added with id: ${this.lastID} - ${name}`)
                }
            })

        })
    }

    static updateGroup(id, name) {
        return new Promise((resolve, reject) => {
            const queryUpdate = `UPDATE Groups
            SET name = "${name}"
            WHERE id = ${id}`

            db.run(queryUpdate, function (errUpdate) {
                if (errUpdate) {
                    reject(errUpdate)
                } else {
                    resolve(`Group name has been updated to "${name}"`)
                }
            })
        })
    }

    static deleteGroup(id, name) {
        return new Promise((resolve, reject) => {
            const queryDelete = `DELETE FROM Groups
                                 WHERE id = ${id} AND name = "${name}"`

            db.run(queryDelete, function (errDelete) {
                if (errDelete) {
                    reject(errDelete)
                } else {
                    resolve(`Group "${name}" has ben deleted`)
                }

                const queryUpdate = `UPDATE ContactGroup
                                     SET groupId = NULL
                                     WHERE groupId = ${id}`

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

    static showGroup(name) {
        return new Promise((resolve, reject) => {
            const queryShow = `SELECT Groups.name, contactId FROM Groups
                           JOIN ContactGroup ON Groups.id = ContactGroup.groupId 
                           WHERE Groups.name = "${name}"
                           ORDER BY Groups.id ASC`

            db.all(queryShow, function (errShow, dataGroup) {
                if (errShow) {
                    reject(errShow)
                } else {
                    resolve(dataGroup)
                }
            })
        })

    }



}

module.exports = Group; 