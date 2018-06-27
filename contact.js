var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./address.db");

class ContactModel{
    constructor(name,company,number,email){
        this.name = name
        this.company = company
        this.number = number
        this.email = email
    }

    create(){
        let query = `INSERT INTO Contacts(name,company,phone_number,email) 
                    VALUES("${this.name}","${this.company}","${this.number}","${this.email}")`
        return new Promise(function(resolve,reject){
            db.run(query,function(err){
                if(err){
                    reject(err)
                }else{
                    console.log(name)
                    resolve(this.name)
                }
            })
        })
    }
}

module.exports = ContactModel