const GroupModel = require("../model/group")
const View = require("../view/view")

class GroupContreller {
  static insert (name_group) {
    GroupModel.insert(name_group)
      .then(message => {
        View.messageInfo(message)
      })
      .catch(err => {
        View.messageErr(err)
      })
  }

  static update (id, name_group) {
    GroupModel.update(id, name_group)
      .then(message => {
        View.messageInfo(message)
      })
      .catch(err => {
        View.messageErr(err)
      })
  }

  static delete (id) {
    GroupModel.delete(id)
      .then(message => {
        View.messageInfo(message)
      })
      .catch(err => {
        View.messageErr(err)
      })
  }

  static showGroup () {
    GroupModel.showGroup()
      .then(message => {
        for (let i = 0; i < message.length; i++) {
          View.messageInfo(message[i].nameGroup)
        }
      })
      .catch(err => {
        View.messageErr(err)
      })
  }
}

module.exports = GroupContreller