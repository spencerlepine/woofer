const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
} = require("../../../models/modelHelpers")

const gatherUserMatchQueue = require("../gatherUserMatchQueue")
const accumulateZipPoolUsers = require("../accumulateZipPoolUsers")

const MAX_QUEUE_ADDITION_LENGTH = 15

const generateMoreQueueMatches = (userId) => {
  console.log("generateMoreQueueMatches for", userId)

  let matchQueue = []
  const setMatchQueue = (newQueue) => (matchQueue = newQueue)

  let userProfile = {}
  const setUserProfile = (newUser) => (userProfile = newUser)

  return gatherUserMatchQueue(userId)
    .then(({ matchQueue }) => {
      // Track the user match queue
      console.log("matchQueue", matchQueue, userId)
      setMatchQueue(matchQueue)
    })
    .then(() => getModelDocumentById("DogUser", "userId", userId))
    .then((thisUser) => {
      setUserProfile(thisUser)
      // Get all users from zipcodes
      let zipcodesList = []
      if (thisUser && thisUser["zipcodes"]) {
        zipcodesList = thisUser.zipcodes
      }

      console.log("zipcodesList", thisUser.zipcodes, userId)

      return accumulateZipPoolUsers(zipcodesList).then((zipCodeUsers) => {
        // Get all users from the match record
        return getModelDocumentById("MatchRecords", "userId", userId).then(
          (matchRecordDoc) => {
            let matchRecord = {}

            if (matchRecordDoc && matchRecordDoc["userMatches"]) {
              matchRecord = matchRecordDoc["userMatches"]
            }
            return [zipCodeUsers, matchRecord]
          }
        )
      })
    })
    .then(([zipcodeUsers, matchRecord]) => {
      console.log("zipcodeUsers", zipcodeUsers, userId)

      const filteredUsers = []

      // console.log(matchRecord, zipcodeUsers)

      zipcodeUsers.forEach((userIdStr) => {
        // Not previously matched
        if (matchRecord[userIdStr] === undefined) {
          filteredUsers.push(userIdStr)
        }
      })

      return filteredUsers
    })
    .then((filteredUsers) => {
      const queueSet = new Set(filteredUsers)
      const newMatchQueue = Array.from(queueSet).slice(0, MAX_QUEUE_ADDITION_LENGTH)
      return newMatchQueue
    })
    .then((uniqueUserList) => {
      const genderChecks = () =>
        Promise.all(
          uniqueUserList.map((userIdStr) =>
            getModelDocumentById("DogUser", "userId", userIdStr).then((user) => {
              let validPrefenceStatus = false
              if (user && user["gender"] && user["preference"]) {
                const gendersPass =
                  userProfile["preference"] === user["gender"] &&
                  user["preference"] === userProfile["gender"]

                if (gendersPass && userIdStr !== userId) {
                  validPrefenceStatus = true
                }
              }
              return {
                validPrefenceStatus,
                userId: userIdStr,
                userName: user["username"],
                them: {
                  gender: user["gender"],
                  preference: user["preference"],
                },
                us: {
                  gender: userProfile["gender"],
                  preference: userProfile["preference"],
                },
              }
            })
          )
        )

      return genderChecks().then((genderCheckObjects) => {
        const validFiltered = []
        genderCheckObjects.forEach(({ validPrefenceStatus, userId }) => {
          if (validPrefenceStatus) {
            validFiltered.push(userId)
          }
        })

        return validFiltered
      })
    })
    .then((finalQueueList) => {
      return getModelDocumentById("MatchQueue", "userId", userId)
        .then((matchQueueDoc) => {
          if (matchQueueDoc) {
            const updateDoc = Object.create(matchQueueDoc)
            updateDoc["matchQueue"] = finalQueueList
            return updateModelDocumentById("MatchQueue", "userId", userId, updateDoc)
          } else {
            const newDoc = {
              userId,
              matchQueue: finalQueueList,
            }
            createModelDocumentById("MatchQueue", "userId", userId, newDoc)
          }
        })
        .then(() => finalQueueList)
    })
    .then((finalQueueList) => ({
      matchQueue: finalQueueList,
    }))
}

module.exports = generateMoreQueueMatches
