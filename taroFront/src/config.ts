if (process.env.TARO_APP_API === 'dev') {
  hosts.api = ''
} else if (process.env.TARO_APP_API === 'test') {
  hosts.api = ''
} else if (process.env.TARO_APP_API === 'pre') {
  hosts.api = ''
} else if (process.env.TARO_APP_API === 'prod') {
  hosts.api = ''
} else {
  hosts.api = ''
}
