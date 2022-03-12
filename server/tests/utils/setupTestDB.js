const mongoose = require("mongoose")
const config = require("../../config/config")

const MONGO_CONFIG = config.MONGOOSE

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(`${MONGO_CONFIG.testUrl}`, MONGO_CONFIG.options);
  });

  beforeEach(async () => {
    await (
      Promise.all(
        Object.values(mongoose.connection.collections)
          .map(async (collection) => await collection.deleteMany()),
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
  // beforeAll(async () => {
  //   await mongoose.connect(`${MONGO_CONFIG.testUrl}`, MONGO_CONFIG.options, ((err) => { if (err) throw err; }))
  // })

  // beforeEach(async () => {
  //   const randomDb = `${MONGO_CONFIG.testUrl}_${(Math.round(Math.random() * 10000))}`
  //   await mongoose.connect(randomDb, MONGO_CONFIG.options, ((err) => { if (err) throw err; }))
  // })

  // beforeEach((done) => {
  //   Promise.all(
  //     Object.values(mongoose.connection.collections).map((collection) =>
  //       collection.deleteMany
  //     )
  //   ).then(done)
  // })

  // afterAll(async () => {
  //   await mongoose.disconnect()
  // })
}

setupTestDB()

module.exports = setupTestDB
