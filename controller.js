const ContactModel = require("./contact.js")
const View = require("./view.js")

class Controller{

    static create(param){
        let name = param[0]
        let company = param[1]
        let number = param[2]
        let email = param[3]
        let contact = new ContactModel(name,company,number,email)
        contact.create()
            .then(function(name){
                let msg = `add ${name}`
                View.display(msg)
            })
            .catch(function(err){
                let msg = `error : ${err}`
                View.display(msg)
            })
    }
}

module.exports = Controller
