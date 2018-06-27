let argv = process.argv
let command = argv[2]
let value =  argv.slice(3)
const Controller = require("./controller.js")

if(command == "add"){
    Controller.create(value)
}