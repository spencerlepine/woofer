const { mockUserB } = global.testHelpers

const generateFemaleDog = () => {
  const newDog = Object.assign(mockUserB)
  newDog["gender"] = "Female"
  newDog["preference"] = "Male"
  newDog["userId"] = "femaleDogUser123"
  return newDog
}

module.exports = generateFemaleDog()
