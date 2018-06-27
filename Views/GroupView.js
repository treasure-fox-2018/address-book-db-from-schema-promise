class View {


  static add(data) {
    console.log(data + ' telah ditambahkan ke nama Group')
  }


  static Help() {
    console.log("GROUPS command")
    console.log("adding group          : group add <name>  ")
    console.log("update group        : group update <id>  <param>  <value>")
    console.log("show group            : group view")
    console.log("delete group          : group delete <id>")
  }

  static update(data) {
    console.log('GROUP dengan id ' + data + ' telah diupdate')
  }


  static delete(data) {
    console.log('GROUP dengan nama ' + data + ' berhasil dihapus')
  }

  static ShowGroup(data) {
    console.log(data)
  }


  static view(data) {
    console.log(data)
  }




}
module.exports = View
