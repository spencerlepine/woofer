const { getModelDocumentById } = require("../../../models/modelHelpers")

const accumulateZipPoolUsers = (zipcodesList) => {
  const getAllPoolUsers = Promise.all(
    zipcodesList.map((zipcodeId) =>
      getModelDocumentById("ZipcodePool", "zipcodeId", zipcodeId).then(
        (zipcodePoolDoc) => {
          if (zipcodePoolDoc && zipcodePoolDoc["zipcodeUsers"]) {
            try {
              const users = Object.keys(zipcodePoolDoc["zipcodeUsers"])
              console.log(users)

              return users
            } catch (err) {
              console.error(err)
              return []
            }
          }
          return []
        }
      )
    )
  )

  return getAllPoolUsers.then((listOrArrays) => {
    const outputList = []
    listOrArrays.forEach((listOfUserIds) => {
      listOfUserIds.forEach((userId) => {
        outputList.push(userId)
      })
    })
    return outputList
  })
}

module.exports = accumulateZipPoolUsers
