var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('AddressBook.db');

db.serialize(function(){
    db.run(`CREATE TABLE IF NOT EXISTS Contacts(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            company TEXT,
            phoneNumber TEXT,
            email TEXT UNIQUE)`)
    db.run(`CREATE TABLE IF NOT EXISTS Groups(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
            )`)
    db.run(`CREATE TABLE IF NOT EXISTS Contact_Group(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contactId INTEGER,
            groupId INTEGER,
            FOREIGN KEY(contactId) REFERENCES Contacts(id),
            FOREIGN KEY(groupId) REFERENCES Groups(id)
            )`)
})