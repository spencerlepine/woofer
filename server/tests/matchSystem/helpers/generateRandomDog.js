const { mockUserB } = global.testHelpers
const randomNum = "Math.round(Math.random() * 100)"

const generateRandomDog = () => {
  const newDog = {
    ...mockUserB,
  }
  newDog["gender"] = "Female"
  newDog["preference"] = "Male"
  newDog["userId"] = `randomDogUser1${randomNum}`
  return newDog
}

module.exports = generateRandomDog
