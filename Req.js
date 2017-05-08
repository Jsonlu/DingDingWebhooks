/**
 * Created by jsonlu on 17/5/5.
 */

const axios = require('axios')
const config = require('./config.json')
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  return response;
  return Promise.reject(error);
});

const instance = axios.create({
  baseURL: 'https://oapi.dingtalk.com/robot/',
  timeout: 8000,
  headers: {'Content-Type': 'application/json; charset=utf-8'}
});

module.exports = {
  req: function (url, param, call) {
    instance.post(url, param)
        .then(function (response) {
          console.log(response.data);
        })
  },
  reqDingd: function (param) {
    let key = config.data.FosunPay[0]
    if (key == "")
      return;
    let data = '项目:' + param.project.name + '\n团队:' + param.project.namespace + '\n提交:' + param.user_name + '\n分支:' +
        param.ref.split("refs/heads/")[1] + '\n内容:'
    let commit = param.commits
    for (let l in commit) {
      let comm = commit[l]
      data += comm.message
      if (comm.modified.length > 0) {
        data += '\n修改:' + comm.modified
      }
      if (comm.added.length > 0) {
        data += '\n增加:' + comm.added
      }
      if (comm.removed.length > 0) {
        data += '\n移除:' + comm.removed
      }
      data += '\n详细:' + comm.url
    }
    let p = {msgtype: 'text', text: {content: data}}
    this.req('send?access_token=' + key, p, '')
  }
}