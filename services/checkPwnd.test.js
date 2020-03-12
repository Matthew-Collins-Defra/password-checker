const fs = require('fs')
const util = require('util')

describe('checkPwnd full call works', () => {
  test('Function works as expected', async () => {
    jest.mock('@hapi/wreck')
    const wreck = require('@hapi/wreck')
    const readFile = util.promisify(fs.readFile)
    const mockWreck = {
      get: jest.fn(async (url, options) => {
        return { payload: await readFile('./example-data/5baa6.txt') }
      })
    }
    wreck.defaults.mockReturnValue(mockWreck)

    const checkPwnd = require('./checkPwnd')
    const result = await checkPwnd('password')
    expect(result).toBe(3730471)
  })
})
