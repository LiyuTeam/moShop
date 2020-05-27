const fs = require('fs')
const config = {}
const testAppId = 'test'
const prodAppId = 'prod'
switch (process.env.TARO_APP_API) {
  case 'dev':
    config.appid = testAppId
    break
  case 'test':
    config.appid = testAppId
    break
  case 'pre':
    config.appid = prodAppId
    break
  case 'prod':
    config.appid = prodAppId
    break
  default:
    config.appid = testAppId
}

function writeJson() {

  fs.readFile('./project.config.json', function (err, data) {
    if (err) {
      return console.error(err)
    }
    var person = { ...JSON.parse(data.toString()), ...config }
    var str = JSON.stringify(person)
    fs.writeFile('./project.config.json', str, (writeFileErr) => {
      if (writeFileErr) {
        console.error(writeFileErr);
      } else {
        console.log('----------修改成功-------------');
      }
    })
  })
}

writeJson()

