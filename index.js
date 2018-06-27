let Controller = require('./Controllers/controllerContact.js') // for contact
let ControllerGroup = require('./Controllers/controllerGroup.js') // for group
let ControllerContactGroup = require('./Controllers/controllerContactGroup.js') // for conjungtion (assign contact-> group)

let Control = new Controller()
let argv = process.argv

//CONTACT
if (argv[2] == 'contact') {

  if (argv[3] == 'add') {
    Control.save(argv[4], argv[5], argv[6], argv[7])
  } else if (argv[3] == 'update') {
    Control.update(argv[4], argv[5], argv[6])
  } else if (argv[3] == 'delete') {
    Control.delete(argv[4])
  } else if (argv[3] == 'view') {
    Control.ShowContact()
  } else if (argv[3] == 'help') {
    Control.Help()
  }
}


//GROUPS
else if (argv[2] == 'group') {

  if (argv[3] == 'add') {
    ControllerGroup.save(argv[4])
  } else if (argv[3] == 'update') {
    ControllerGroup.update(argv[4], argv[5], argv[6])
  } else if (argv[3] == 'delete') {
    ControllerGroup.delete(argv[4])
  } else if (argv[3] == 'view') {
    ControllerGroup.ShowGroup()
  } else if (argv[3] == 'help') {
    ControllerGroup.Help()
  }


}


//ASSIGN CONTACT to GROUPS
else if (argv[2] == 'assign') {
  // node index.js assign id_contact id_group
  ControllerContactGroup.assign(argv[3], argv[4])
}




//def
if (argv[2] == undefined) {
  //if run node index.js without command:  will show all default help
  Control.Help()
  console.log('\n-----------\n')
  ControllerGroup.Help()
}
