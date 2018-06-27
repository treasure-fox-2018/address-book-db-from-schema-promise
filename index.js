const argv = process.argv
argv.splice(0,2)

const command = argv[0]
const table = argv[1]

const controller = require('./controller')

if(command=='help'||command==undefined){
    console.log(`
    menu contact :
    create --> node index.js create contact (name) (company) (phoneNumber) (email)
    delete --> node index.js delete contact (id)
    update --> node index.js update contact (id) (coloumn) (value)
    show --> node index.js show contact
    **************
    menu group :
    create --> node index.js create group (name)
    delete --> node index.js delete group (id)
    update --> node index.js update group (id) (coloumn) (value)
    show --> node index.js show group
    `);
    
}

switch (table){
    case "contact":
        if(command=='create'){
            //name,company,phoneNumber,email
            controller.Contact.Create(argv[2],argv[3],argv[4],argv[5])
        }
        else if(command=='delete'){
            //id
            controller.Contact.Delete(argv[2])
        }
        else if(command=='update'){
            //id, coloumn, value
            controller.Contact.Update(argv[2],argv[3],argv[4])
        }
        else if(command=="show"){
            controller.Contact.Show()
        }
    break;
    case "group":
        if(command=='create'){
            //name
            controller.Group.Create(argv[2])
        }
        else if(command=='delete'){
            //id
            controller.Group.Delete(argv[2])
        }
        else if(command=='update'){
            //id, coloumn, value
                controller.Group.Update(argv[2],argv[3],argv[4])
        }
        else if(command=="show"){
            controller.Group.Show()
        }
    break;
}