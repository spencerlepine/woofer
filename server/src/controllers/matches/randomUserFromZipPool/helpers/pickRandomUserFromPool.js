const pickRandomUserFromPool = (poolUsers) => {
  let validUserId = null

  if (poolUsers.length === 0) {
    return
  } else {
    while (!validUserId) {
      const tempId = poolUsers[Math.floor(Math.random() * poolUsers.length)]
      if (tempId !== userId) {
        validUserId = tempId
      }
    }
  }

  return Promise.resolve(validUserId)
}

module.exports = pickRandomUserFromPool
