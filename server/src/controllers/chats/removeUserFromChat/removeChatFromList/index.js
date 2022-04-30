const removeChatFromList = (chatId, list) => {
  const outputList = []

  list.forEach((chatObj) => {
    if (chatObj.chatId !== chatId) {
      outputList.push(chatObj)
    }
  })

  return outputList
}

module.exports = removeChatFromList
