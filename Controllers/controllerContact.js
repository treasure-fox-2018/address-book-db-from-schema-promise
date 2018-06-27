let Contacts = require('../Models/contactModel.js')
let Contact = new Contacts();
let Views = require('../Views/ContactView.js')
// let ViewContact = new Views()

class Controller {

  save(name, company, phone, email) {
    let contact = new Contacts(name, company, phone, email)
    contact.save()
      .then(function (data) {
        Views.add(data)
      })
      .catch(function (err) {
        Views.view(err)
      })
  }

  update(id, param, value) {
    Contact.update(id, param, value)
      .then(function (data) {
        Views.update(data)
      })
      .catch(function (err) {
        Views.view(err)
      })
  }

  Help() {
    Views.Help()
  }

  delete(id) {
    Contact.delete(id)
      .then(function (data) {
        Views.delete(data)
      })
      .catch(function (err) {
        Views.view(err)
      })

  }


  ShowContact() {
    Contact.ShowContact()
      .then(function (data) {
        Views.ShowContact(data)
      })
      .catch(function (err) {
        Views.view(err)
      })
  }


}


module.exports = Controller
