const Joi = require('@hapi/joi')

const schema = Joi.object({
  restClientTimeoutMillis: Joi.number().default(20000),
  pwApiUrl: Joi.string().default('https://api.pwnedpasswords.com/range/')
})

const config = {
  restClientTimeoutMillis: process.env.REST_CLIENT_TIMEOUT_IN_MILLIS,
  pwApiUrl: process.env.PW_API_URL
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`Invalid Configuration. ${result.error.message}`)
}

const value = result.value

module.exports = value
