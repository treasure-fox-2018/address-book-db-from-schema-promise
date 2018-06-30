const Contact = require('./contact.js');
const Group = require('./group.js');
const ContactGroup = require('./contact-group.js');
const View = require('./view.js');

class Controller {

    static transferContacts() {
        Contact.transferContacts()
            .then(contacts => {
                View.displayMessage(contacts)
            })
            .catch(err => {
                View.displayError(err)
            })

    }

    static createContact(name, company_name, phone_number, email) {
        Contact.createContact(name, company_name, phone_number, email)
            .then(contact => {
                View.displayMessage(contact)
            })
            .catch(err => {
                View.displayError(err)
            })

    }

    static updateContact(id, name, company_name, phone_number, email) {
        Contact.updateContact(id, name, company_name, phone_number, email)
            .then(contact => {
                View.displayMessage(contact)
            })
            .catch(err => {
                View.displayError(err)
            })
    }


    static deleteContact(id, name) {
        Contact.deleteContact(id, name)
            .then(contact => {
                View.displayMessage(contact)
            })
            .catch(err => {
                View.displayError(err)
            })
    }


    static transferGroups() {
        Group.transferGroups()
        .then(groups => {
            View.displayMessage(groups)
        })
        .catch(err => {
            View.displayError(err)
        })
    }

    static createGroup(name) {
        Group.createGroup(name)
        .then(group => {
            View.displayMessage(group)
        })
        .catch(err => {
            View.displayError(err)
        })
    }

    static updateGroup(id, name) {
        Group.updateGroup(id, name)
        .then(group => {
            View.displayMessage(group)
        })
        .catch(err => {
            View.displayError(err)
        })
    }


    static deleteGroup(id, name) {
        Group.deleteGroup(id, name)
        .then(group => {
            View.displayMessage(group)
        })
        .catch(err => {
            View.displayError(err)
        })
    }

    static transferContactGroup() {
        ContactGroup.transferContactGroup()
        .then(contactgroup => {
            View.displayMessage(contactgroup)
        })
        .catch(err => {
            View.displayError(err)
        })
    }

    static showContact(id) {
        Contact.showContact(id)
            .then(contact => {
                View.displayMessage(contact)
            })
            .catch(err => {
                View.displayError(err)
            })
    }

    static showGroup(name) {
        Group.showGroup(name)
        .then(group => {
            View.displayMessage(group)
        })
        .catch(err => {
            View.displayError(err)
        })
    }

    static assignContact(ContactName, GroupName) {
        Contact.assignContact(ContactName, GroupName)
        .then(group => {
            View.displayMessage(group)
        })
        .catch(err => {
            View.displayError(err)
        })
    }
}

module.exports = Controller;