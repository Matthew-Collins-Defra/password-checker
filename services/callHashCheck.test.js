const password = 'password'
const pwHash = '5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8'
const hashList = '0018A45C4D1DEF81644B54AB7F969B88D65:1\n00D4F6E8FA6EECAD2A3AA415EEC418D38EC:2'
const callHashCheck = require('./callHashCheck')
const fs = require('fs')
const util = require('util')

describe('Hash Check', () => {
  test('Hash function works as expected', () => {
    const hashResult = callHashCheck.getHash('password')
    expect(hashResult).toBe(pwHash)
  })

  test('checkPassword call calls the fetch function', async () => {
    expect.assertions(2)
    async function callback (url, options) {
      expect(url).toBe(`nourl/${pwHash.slice(0, 5)}`)
      return 'testresult'
    }
    const pwCheckResult = await callHashCheck.checkPassword(password, 'nourl/', callback)
    expect(pwCheckResult).not.toBe('')
  })

  test('checkPasswordHash calls the fetch function', async () => {
    expect.assertions(2)
    async function callback (url, options) {
      expect(url).toBe(`nourl/${pwHash.slice(0, 5)}`)
      return 'testresult'
    }
    const pwCheckResult = await callHashCheck.checkPasswordHash(pwHash, 'nourl/', callback)
    expect(pwCheckResult).not.toBe('')
  })

  test('findHashQty returns the correct value for an existing hash', () => {
    const qty = callHashCheck.findHashQty('00D4F6E8FA6EECAD2A3AA415EEC418D38EC', hashList)
    expect(qty).toBe(2)
  })

  test('findHashQty returns the correct value for an missing hash', () => {
    const qty = callHashCheck.findHashQty('hash-hash', hashList)
    expect(qty).toBe(0)
  })

  test('findHashQty returns the correct value for a lowercase hash', () => {
    const qty = callHashCheck.findHashQty('00d4f6e8fa6eecad2a3aa415eec418d38ec', hashList)
    expect(qty).toBe(2)
  })

  test('checkPassword works with example data', async () => {
    const readFile = util.promisify(fs.readFile)
    const getFunc = (url, options) => readFile('./example-data/5baa6.txt', 'utf8')
    const result = await callHashCheck.checkPassword('password', 'url', getFunc)
    expect(result).toBe(3730471)
  })

  test('time to process list', () => {
    const readHashList = fs.readFileSync('./example-data/5baa6.txt', 'utf8')
    const startT = process.hrtime()
    const qty = callHashCheck.findHashQty('00d4f6e8fa6eecad2a3aa415eec418d38ec', readHashList)
    const endT = process.hrtime(startT)
    console.log(`Time taken ${endT[0]} seconds, ${endT[1]} nano`)
    expect(qty).toBe(2)
  })
})
