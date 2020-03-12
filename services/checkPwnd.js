const clientCall = require('./clientcall')
const callHashCheck = require('./callHashCheck')
const config = require('../config')

const checkPwnd = async function (password) {
  const numberUsed = callHashCheck.checkPassword(password, config.pwApiUrl, clientCall.get)
  return numberUsed
}

module.exports = checkPwnd
