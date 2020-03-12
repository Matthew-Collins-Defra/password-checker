const crypto = require('crypto')

const self = {
  getHashList: async function (hashPart, url, callFunction) {
    const response = await callFunction(`${url}${hashPart}`, { headers: { 'Add-Padding': 'true' } })
    return response
  },

  findHashQty: function (hashPart, hashList) {
    const arrOfHash = hashList.split('\n')
    const searchValue = hashPart.toUpperCase()
    const foundItem = arrOfHash.find(x => x.split(':')[0].toUpperCase() === searchValue)
    return foundItem ? parseInt(foundItem.split(':')[1]) : 0
  },

  checkPasswordHash: async function (hash, url, callFunction) {
    const firstPart = hash.slice(0, 5)
    const secondPart = hash.slice(5)
    const hashList = await this.getHashList(firstPart, url, callFunction)
    const hashUsed = this.findHashQty(secondPart, hashList)
    return hashUsed
  },

  getHash: function (password) {
    const shasum = crypto.createHash('sha1')
    shasum.update(password)
    return shasum.digest('hex').toUpperCase()
  },

  checkPassword: async function (password, url, callFunction) {
    const hash = this.getHash(password)
    return this.checkPasswordHash(hash, url, callFunction)
  }

}

module.exports = self
