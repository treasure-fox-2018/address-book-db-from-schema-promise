const ModelGroup = require('../model/groupModel.js')
const View = require('../view/view.js')

class Group {
    
    static insertGroup(name) {
        ModelGroup.insertGroup(name)
            .then(function(dataInsertGroup) {
                View.insertGroup(dataInsertGroup)
            })
            .catch(function(err){
                View.insertContact(err)
            })
    }

    static updateGroup(contentUpdate) {
        ModelGroup.updateGroup(contentUpdate)
            .then(function(dataUpdateGroup) {
                View.updateGroup(dataUpdateGroup)
            })
            .catch(function(err) {
                View.updateGroup(err)
            })
    }

    static showGroup() {
        ModelGroup.showGroup()
            .then(function(dataShowGroup) {
                View.showGroup(dataShowGroup)
            })
            .catch(function(err) {
                View.showGroup(err)
            })
    }

    static deleteGroup(idGroup) {
        ModelGroup.deleteGroup(idGroup)
            .then(function(deletedData) {
                View.deleteGroup(deletedData)
            })
            .catch(function(err) {
                View.deleteGroup(err)
            })
    }
}

module.exports = Group