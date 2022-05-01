import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { MdRefresh as RefreshIcon } from "react-icons/md"

import * as ROUTES from "config/routeConstants"
import * as userAPI from "api/account"
import * as chatsAPI from "api/chats"

const extractProfileImage = (userObj) => {
  const missingImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  try {
    const { profilePicture } = userObj
    return profilePicture || missingImg
  } catch (err) {
    return missingImg
  }
}

const extractDisplayName = (userObj) => {
  if (userObj["userId"] === undefined) {
    return "Anonymous"
  } else {
    const { firstName, lastName } = userObj
    return `${firstName} ${lastName}`
  }
}

const extractLastMessage = (message) => {
  const defaultMessage = {
    value: "Say Hi!",
  }

  if (message && message.value) {
    defaultMessage.value = message.value
  }

  return defaultMessage
}

const OpenChatLink = ({ chatId, otherUserId, i }) => {
  const [user, setUser] = useState({})
  const [lastMessage, setLastMessage] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user["userId"] === undefined) {
      setLoading(true)
      userAPI.fetchUserProfile(otherUserId, (userProfile) => {
        setUser(userProfile)
        setLoading(false)
      })
    }
  }, [otherUserId])

  useEffect(() => {
    if (lastMessage["value"] === undefined) {
      setLoading(true)
      chatsAPI.fetchLastChatMessage(chatId, (message) => {
        setLastMessage(message)
        setLoading(false)
      })
    }
  }, [otherUserId])

  const name = extractDisplayName(user)
  const profilePic = extractProfileImage(user)

  const { value } = extractLastMessage(lastMessage)

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Link to={`${ROUTES.CHAT}/${chatId}/${otherUserId}`}>
          <div className="card">
            <header className="card-header">
              <figure class="image is-32x32 my-auto pl-3">
                <img
                  className="is-rounded chatProfilePic m-auto"
                  src={profilePic}
                  alt="Profile Picture"
                ></img>
              </figure>

              <p className="card-header-title">{name}</p>
              <p className="subtitle is-6 has-text-gray my-auto px-3">{value}</p>
            </header>
          </div>
        </Link>
      )}
    </>
  )
}

export default OpenChatLink
