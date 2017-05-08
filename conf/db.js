/**
 * Created by jsonlu on 17/5/6.
 */

var orm = require("orm");
//DB config
var opts = {
  database: "wechat",
  protocol: "mysql",
  host: "localhost",
  username: "root",
  password: "root",
  query: {
    pool: true,
  },
}
orm.connect(opts, function (err, db) {
  if (err) throw err;

  var User = db.define("users", {
    id: Number,
    name: String,
    age: Number
  });

  //insert data
  User.create(
      [{name: 'Jane', age: 18}], function (err, items) {
        if (err) throw err;
      })
// //search data
//   User.find({name: 'Jane'}, function (err, User) {
//     console.log("User found: ", User.length);
//     console.log("User name: ", User[0].name);
//     console.log("User age : ", User[0].age);
//     /*
//      //update data
//      User[1].age=19
//      User[1].save(function (err) {
//      // err.msg = "under-age";
//      console.log("update successfully!");
//      });*/
//
//
//     /*
//      //delete data
//      User[0].remove(function(err){
//      console.log("delete successfully!")
//      })*/
//   });

});