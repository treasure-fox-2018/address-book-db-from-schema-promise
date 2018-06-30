const fs = require('fs');
const db = require('./db.js');


class ContactGroup {
    constructor(contactId, groupId) {
        this.id = null
        this.contactId = contactId
        this.groupId = groupId
    }

    static transferContactGroup(callback) {
        return new Promise((resolve, reject) => {
            let contactgroup = JSON.parse(fs.readFileSync('datacontactgroup.JSON', 'utf8'));
            for (let i = 0; i < contactgroup.length; i++) {
                const queryInput = `INSERT INTO ContactGroup (contactId, groupId)
                            VALUES ("${contactgroup[i].contactId}", "${contactgroup[i].groupId}")`
                db.serialize(function () {
                    db.run(queryInput, function (errTransfer) {
                        if (errTransfer) {
                            reject(errTransfer)
                        } else {
                            resolve(`Data transfer successful`)
                        }
                    })
                })
            }
        })
    }

}

module.exports = ContactGroup;