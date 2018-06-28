const ModelContact = require('../model/contactModel')
const View = require('../view/view.js')

class Contact {

    static insertContact(content) {
        if(content[3].indexOf('@') == -1 || content[3].indexOf('.com') == -1) {
            console.log('Invalid email input, you must use "@" and ".com" ')
        } else {
            ModelContact.insertContact(content)
                .then(function(dataContent) {
                    View.insertContact(dataContent)
                })
                .catch(function(err) {
                    View.insertContact(err)
                })
        }
        
    }

    static updateContact(contentUpdate) {
        ModelContact.updateContact(contentUpdate)
            .then(function(dataUpdate) {
                View.updateContact(dataUpdate)
            })
            .catch(function(err) {
                View.updateContact(err)
            })
    }

    static showContact() {
        ModelContact.showContact()
            .then(function(dataContact) {
                View.showContact(dataContact)
            })
            .catch(function(err) {
                View.showContact(err)
            })
    }

    static deleteContact(idContact) {
        ModelContact.deleteContact(idContact)
            .then(function(dataContact) {
                View.deleteContact(dataContact)
            })
            .catch(function(err) {
                View.showContact(err)
            })
    }
}

module.exports = Contact