const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
} = require("../../../models/modelHelpers")

const gatherUserMatchQueue = require("../gatherUserMatchQueue")
const accumulateZipPoolUsers = require("../accumulateZipPoolUsers")

const MAX_QUEUE_ADDITION_LENGTH = 15

const generateMoreQueueMatches = (userId) => {
  let matchQueue = []
  const setMatchQueue = (newQueue) => (matchQueue = newQueue)

  let userProfile = {}
  const setUserProfile = (newUser) => (userProfile = newUser)

  let allZipcodeUsers = []
  const setZipcodeUsers = (newUsers) => (allZipcodeUsers = newUsers)

  return gatherUserMatchQueue(userId)
    .then(({ matchQueue }) => {
      // Track the user match queue
      setMatchQueue(matchQueue)
    })
    .then(() => getModelDocumentById("DogUser", "userId", userId))
    .then((user) => {
      // Track the user profile document
      setUserProfile(user)
    })
    .then(() => {
      // Get all users from zipcodes
      let zipcodesList = []
      if (userProfile && userProfile["zipcodes"]) {
        zipcodesList = userProfile.zipcodes
      }

      return accumulateZipPoolUsers(zipcodesList).then((zipCodeUsers) => {
        setZipcodeUsers(zipCodeUsers)
      })
    })
    .then(() => {
      // Get all users from the match record
      return getModelDocumentById("MatchRecords", "userId", userId).then(
        (matchRecordDoc) => {
          let matchRecord = {}
          if (matchRecordDoc && matchRecordDoc["userMatches"]) {
            matchRecord = matchRecordDoc["userMatches"]
          }
          return matchRecord
        }
      )
    })
    .then((matchRecord) => {
      const filteredUsers = []

      allZipcodeUsers.forEach((userIdStr) => {
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
    .then((finalQueueList) => {
      return getModelDocumentById("MatchQueue", "userId", userId)
        .then((matchQueueDoc) => {
          if (matchQueueDoc) {
            const updateDoc = new Object(matchQueueDoc)
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
