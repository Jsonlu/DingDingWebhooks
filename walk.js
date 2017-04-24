/**
 * Created by jsonlu on 17/4/24.
 */
const path = require('path')
const fs = require('fs')

let entry = {};

module.exports = {
  data: entry,
  read: function walk(dir, root) {
    let directory = path.join(__dirname, root, dir)
    fs.readdirSync(directory).forEach(function (file) {
      let fullpath = path.join(directory, file)
      let stat = fs.statSync(fullpath)
      if (stat.isFile() && (path.extname(fullpath) === '.json')) {
        let name = path.join(dir, path.basename(file, '.json'))
        entry[name] = fullpath
      } else if (stat.isDirectory() && exclude.call(file, ['filters', 'common'])) {
        let subdir = path.join(dir, file)
        walk(subdir, root)
      }
    })
  }
}