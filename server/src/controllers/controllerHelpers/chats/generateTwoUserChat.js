const controllerHelpers = require("../helpers")

const uniqueString = () => {
  const makeId = (length) => {
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  return makeId(25)
}

const generateTwoUserChat = () => {
  return Promise.resolve(uniqueString())
}

module.exports = generateTwoUserChat
