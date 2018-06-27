let Group = require('../Models/GroupModel.js')
let Groups = new Group();
let Views = require('../Views/GroupView.js')
// let ViewContact = new Views()

class Controller {

  static save(groupname) {
    let group = new Group(groupname)
    group.save()
      .then(function (data) {
        Views.add(data)
      })
      .catch(function (err) {
        Views.view(err)
      })
  }


  static Help() {
    Views.Help()
  }

  static update(id, param, value) {
    Groups.update(id, param, value)
      .then(function (data) {
        Views.update(data)
      })
      .catch(function (err) {
        Views.view(err)
      })
  }

  static delete(id) {
    Groups.delete(id)
      .then(function (data) {
        Views.delete(data)
      })
      .catch(function (err) {
        Views.view(err)
      })
  }


  static ShowGroup() {
    Groups.ShowGroup()
      .then(function (dataGrup) {
        Views.ShowGroup(dataGrup)
      })
      .catch(function (err) {
        Views.view(err)
      })
  }




}


module.exports = Controller
