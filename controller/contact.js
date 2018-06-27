const ContactModel = require("../model/contact")
const View = require("../view/view")

class ContactContreller {
  static insert (name, perusahaan, number_phone, email) {
    ContactModel.insert(name, perusahaan, number_phone, email)
      .then(message => {
        View.messageInfo(message)
      })
      .catch(err => {
        View.messageErr(err)
      })
  }

  static update (id, name, perusahaan, number_phone, email) {
    ContactModel.update(id, name, perusahaan, number_phone, email)
    .then(message => {
        View.messageInfo(message)
    })
    .catch(err => {
      View.messageErr(err)
    })
  
  }

  static delete (id) {
    ContactModel.delete(id)
      .then(message => {
        View.messageInfo(message)
      })
      .catch(err => {
        View.messageErr(err)
      })
  }

  static showContact () {
    ContactModel.showContact()
      .then(message => {
        View.messageInfo(message)
      })  
      .catch(err => {
        View.messageErr(err)
      })
  }

}

module.exports = ContactContreller