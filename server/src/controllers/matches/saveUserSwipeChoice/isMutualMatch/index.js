const isMutualMatch = (matchObj) => {
  try {
    if (typeof matchObj === "object" && Object.keys(matchObj).length === 2) {
      const userChoices = Object.values(matchObj)
      return userChoices.every((choice) => choice === "accept")
    }
    return false
  } catch (err) {
    return false
  }
}

module.exports = isMutualMatch
