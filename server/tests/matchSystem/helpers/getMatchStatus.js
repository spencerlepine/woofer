const {
  modelHelpers: { getModelDocumentById },
} = global.testHelpers

const getMatchStatus = (thisUserId, thatUserId) => {
  let userAChoice = "none"
  let userBChoice = "none"

  const setUserChoiceA = (newChoice) => {
    userAChoice = newChoice
  }

  const setUserChoiceB = (newChoice) => {
    userBChoice = newChoice
  }

  return getModelDocumentById("MatchRecords", "userId", thisUserId)
    .then((matchRecord) => {
      if (matchRecord && matchRecord["userMatches"]) {
        const matches = matchRecord["userMatches"]
        setUserChoiceA(matches[thatUserId] || "none")
      }
    })
    .then(() => getModelDocumentById("MatchRecords", "userId", thatUserId))
    .then((matchRecord) => {
      if (matchRecord && matchRecord["userMatches"]) {
        const matches = matchRecord["userMatches"]
        setUserChoiceB(matches[thisUserId] || "none")
      }
    })
    .then(() => {
      const responseObj = {
        [thisUserId]: userAChoice,
        [thatUserId]: userBChoice,
      }

      return responseObj
    })
}

module.exports = getMatchStatus
