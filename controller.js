const model = require('./model')
const view = require('./view')

class Contact{
    static Create(name,company,phone,email){
        model.Contact.Create(name,company,phone,email)
        .then(function(status){
            view.Contact.Create(status)
        })
    }
    static Delete(id){
        model.Contact.Delete(id)
        .then(function(status){
            view.Contact.Delete(status)
        })
    }
    static Update(id,colomn,value){
        model.Contact.Update(id,colomn,value)
        .then(function(status){
            view.Contact.Update(status)
        })

    }
    static Show(){
        model.Contact.Show()
        .then(function(contacts){
            view.Contact.Show(contacts)
        })
    }
}

class Group{
    static Create(name){
        model.Group.Create(name)
        .then(function(status){
            view.Group.Create(status)
        })

    }
    static Delete(id){
        model.Group.Delete(id)
        .then(function(status){
            view.Group.Delete(status)
        })
        
    }
    static Update(id,colomn,value){
        model.Group.Update(id,colomn,value)
        .then(function(status){
            view.Group.Update(status)
        })
    }
    static Show(){
        model.Group.Show()
        .then(function(groups){
            view.Group.Show(groups)
        })
    }
}

module.exports = {
    Contact,
    Group
}