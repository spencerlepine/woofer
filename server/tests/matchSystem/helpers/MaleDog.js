const { mockUser } = global.testHelpers

const generateMaleDog = () => {
  const newDog = Object.assign(mockUser)
  newDog["gender"] = "Male"
  newDog["preference"] = "Female"
  newDog["userId"] = "maleDogUser567"
  return newDog
}

module.exports = generateMaleDog()
