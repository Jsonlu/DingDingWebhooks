/**
 * Created by jsonlu on 17/5/6.
 */
const Sequelize = require('sequelize')
module.exports = {
  User: (db) => {
    return db.define("users", {
      name: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.STRING,
      }
    })
  }
}