const config = require('../config')
const wreck = require('@hapi/wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

const self = module.exports = {
  request: async (method, url, options) => {
    const response = await wreck[method](url, options)
    return response.payload.toString('utf8')
  },

  get: async (url, options) => {
    return self.request('get', url, options)
  }
}
