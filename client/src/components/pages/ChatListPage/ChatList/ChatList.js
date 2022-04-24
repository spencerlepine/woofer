import React from "react"
import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"

import * as chatsAPI from "api/chats"

import constants from "config/constants"
const { DATA_KEYS } = constants
const chatsKey = DATA_KEYS["USER_CHATS"]

import useChats, { ChatsProvider } from "context/ChatsContext/ChatsContext"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"

const ChatList = () => {
  const { availableChats } = useChats()
  const { currentUser, accountDetails } = useAuth()

  const validChats = accountDetails[chatsKey] || []

  const TempCreateBtn = () => {
    const handleCreateChat = () => {
      const thisUserId = currentUser["uid"] || currentUser[DATA_KEYS["USER_ID"]]
      const thatUserId = "PuBuHLn9fyVfAnLQNcPgCPG7vBZ2"
      chatsAPI.createChat(thisUserId, thatUserId)
    }

    return (
      <button className="button is-primary" onClick={handleCreateChat}>
        Create New Chat
      </button>
    )
  }

  return (
    <div className="hero-body">
      <div className="container">
        <div className="is-centered">
          <header>
            <TempCreateBtn />
            <h4>All Chats:</h4>
          </header>

          {validChats.map(({ [DATA_KEYS["CHAT_ID"]]: chatId, otherUserId }, i) => (
            <div className="card" key={i}>
              <header class="card-header">
                <p class="card-header-title">Chat #{i}</p>
                <Link
                  to={`${ROUTES.CHAT}?roomId=${chatId}`}
                  className="card-header-icon"
                >
                  Open
                </Link>
              </header>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const WrappedChatList = (props) => (
  <AuthProvider>
    <ChatsProvider>
      <ChatList {...props} />
    </ChatsProvider>
  </AuthProvider>
)

export default WrappedChatList
