const DogUser = require('../../models/DogUser');
const { DATA_KEYS } = require('../../../config/constants')
const verifyEndpointRequest = require('../../utils/verifyEndpointRequest');
const logger = require('../../../config/logger')

const mockUser = {
  [DATA_KEYS["USER_NAME"]]: 'john1234',
  [DATA_KEYS["USER_ZODIAC"]]: "Virgo",
  [DATA_KEYS["USER_GENDER"]]: "Male",
  [DATA_KEYS["USER_BREED"]]: "Shiba",
  [DATA_KEYS["USER_BIO"]]: "Example description",
  [DATA_KEYS["USER_BIRTHYEAR"]]: 2002,
  [DATA_KEYS["USER_PREFERENCE"]]: "Female",
  [DATA_KEYS["USER_ZIPCODES"]]: [],
  [DATA_KEYS["USER_PICTURES"]]: [],
  [DATA_KEYS["USER_CHATS"]]: [],
};

module.exports = {
  signupUser: (req, res) => {
    const id = DATA_KEYS["USER_ID"];

    DogUser.find({ '_id': '622ce2faaeded052d6ee84c2' })
      .then(items => {
        console.log(`Successfully found ${items.length} documents.`)
        items.forEach(logger.info)
        res.status(201).json("WORKING");
        return items
      })
      .catch(err => {
        console.error(`Failed to find documents: ${err}`);
        return res.status(500)
      })

    // const validRequestCheck = verifyEndpointRequest(req, ['SIGNUP'], 'POST');

    // if (validRequestCheck === true) {
    //   // const query = {
    //   //   [id]: req.body[id]
    //   // };
    //   // const update = {
    //   //   $set: req.body
    //   // };
    //   // const options = { upsert: true, multi: true };

    //   const newUser = new DogUser({
    //     ...mockUser,
    //     ...req.body
    //   });
    //   const savePromise = new Promise((resolve, reject) => {
    //     // Save model
    //     newUser.save((err) => {
    //       if (err) {
    //         logger.error(`${err}`)
    //         return reject(new Error(`Error attempting to save... ${err}`));
    //       }
    //       // Return saved model
    //       return resolve(newUser);
    //     });
    //   });

    //   savePromise
    //     .then((resultData) => {
    //       res.status(201).json(resultData);
    //     })
    //     .catch((err) => {
    //       res.status(500).send(err);
    //     });

    //   // DogUser.updateOne(query, update, options)
    //   //   .then(
    //   //     res => {
    //   //       console.log(res);
    //   //       res.status(201).json('Successfully created user account')
    //   //     },
    //   //     err => console.error(`Something went wrong: ${err}`),
    //   //   );
    // } else {
    //   console.error(validRequestCheck)
    //   res.status(400).json(validRequestCheck)
    // }
  },
}
