const { DATA_KEYS } = require('../../../config/constants');

const fetchUserDocument = require('../chats/fetchUserDocument');

const addChatIdToUserProfile = (res, thisUserID, chatId, idKey) => {
  return fetchUserDocument(res, { [idKey]: thisUserID })
    .then((userProfile) => {
      // Pull the current list of chats from the user profile
      const {
        [DATA_KEYS["USER_CHATS"]]: userChats,
      } = userProfile

      const extendedChats = [...userChats, chatId]
      const newChatList = Array.from(new Set(extendedChats))

      const query = {
        [idKey]: thisUserID
      };
      const update = {
        $set: {
          [DATA_KEYS["USER_CHATS"]]: newChatList
        }
      };
      const options = {};

      return updateUserDocument(res, query, update, options)
    })
}

module.exports = addChatIdToUserProfile
