const pickRandomUserFromPool = (poolUsers, thisUserId) => {
  const invalidArgs = !(typeof poolUsers === "object" && thisUserId)
  if (invalidArgs) {
    const err = "fetchUsersInZipCodePool called with invalid arguments"
    const failPromise = new Promise((resolve, reject) => {
      reject(err)
    })
    return failPromise
  }

  let validUserId = null

  if (poolUsers.length === 0) {
    return
  } else {
    while (!validUserId) {
      const tempId = poolUsers[Math.floor(Math.random() * poolUsers.length)]
      if (tempId !== thisUserId) {
        validUserId = tempId
      }
    }
  }

  return new Promise((resolve, reject) => {
    resolve(validUserId)
  })
}

module.exports = pickRandomUserFromPool