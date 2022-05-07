const { mockUserB } = global.testHelpers

const generateRandomDog = () => {
  const newDog = Object.assign(mockUserB)
  newDog["gender"] = "Female"
  newDog["preference"] = "Male"
  newDog["userId"] = `randomDogUser1${Math.round(Math.random() * 100)}`
  return newDog
}

module.exports = generateRandomDog
