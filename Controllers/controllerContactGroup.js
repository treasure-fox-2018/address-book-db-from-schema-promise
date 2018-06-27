let GroupContact = require('../Models/ContactGroupModel.js')
let GC = new GroupContact();
let Views = require('../Views/GroupContactView.js')
// let ViewContact = new Views()

class Controller {

  static assign(id_contact, id_group) {
    let gc = new GroupContact(id_contact, id_group)
    gc.Assign(id_contact)
      .then(function (data) {
        Views.ViewAssign(data)
      })
      .catch(function (err) {
        Views.view(err)
      })
  }


}


module.exports = Controller
