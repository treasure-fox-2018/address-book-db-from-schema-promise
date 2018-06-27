const ModelContactGroup = require("../model/contact-group")
const View = require("../view/view")

class ControllerContactGroup {
  static assign (contact_id, group_id) {
    ModelContactGroup.insert(contact_id, group_id).then(message => {
      View.messageInfo(message)
    })
    .catch(err => {
      View.messageErr(err)
    })
  }

  static update (id, contact_id, group_id) {
    ModelContactGroup.update(id, contact_id, group_id).then(message => {
      View.messageInfo(message)
    })
    .catch(err => {
      View.messageErr(err)
    })
  }
}

module.exports = ControllerContactGroup