/**
 * Created by jsonlu on 17/5/6.
 */
const conf = require('./conf.json').db
const Sequelize = require('sequelize')
const sequelize = new Sequelize(conf.name, conf.user, conf.pwd, {
  host: conf.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var User = require('../model/User').User(sequelize)

// var trans = () => {
//   return sequelize
//       .transaction((t) => {
//         return User.create({
//           firstName: 'Abraham',
//           lastName: 'Lincoln'
//         }, {transaction: t})
//             .then((user) => {
//             });
//       }).then((result) => {
//       }).catch((err) => {
//         console.log(err)
//       });
// }

// trans();


User.sync().then(function () {
  return User.create({
    name: 'John',
    age: 8
  });
});