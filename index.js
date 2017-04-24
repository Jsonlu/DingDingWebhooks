/**
 * Created by jsonlu on 17/4/24.
 */
const express = require('express');
const walk = require('./walk')
const fs = require('fs')

walk.read('./', 'data')
let entry = walk.data

var router = express.Router();
var app = module.exports = express();
app.use("/api", router);
router.use((req, res, next) => {
  console.log('进入中间件')
  next()
})

for (let key in entry) {
  router.get('/' + key, (req, res, nex) => {
    console.log('进入路由');
    fs.readFile(entry[key], {flag: 'r+', encoding: 'utf8'}, (err, fd) => {
      if (err) {
        console.error(err);
        return;
      }
      res.json(fd)
    })
  })
}

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
