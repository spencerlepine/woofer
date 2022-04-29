import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { BiError } from "react-icons/bi"

import * as ROUTES from "config/routeConstants"
import * as chatsAPI from "api/chats"

import constants from "config/constants"
const { DATA_KEYS } = constants
const chatsKey = DATA_KEYS["USER_CHATS"]

import useChats, { ChatsProvider } from "context/ChatsContext/ChatsContext"
import useAuth from "context/AuthContext/AuthContext"

const ChatList = () => {
  const { availableChats, fetchUserChats } = useChats()
  const { currentUser, accountDetails } = useAuth()

  const validChats = accountDetails[chatsKey] || []

  const handleRefresh = () => {
    if (currentUser && currentUser[DATA_KEYS["USER_ID"]]) {
      const userId = currentUser[DATA_KEYS["USER_ID"]]
      fetchUserChats(userId)
    }
  }

  useEffect(() => {
    if (currentUser && currentUser[DATA_KEYS["USER_ID"]]) {
      handleRefresh()
    }
  }, [currentUser])

  // const TempCreateBtn = () => {
  //   const handleCreateChat = () => {
  //     const thisUserId = currentUser["uid"] || currentUser[DATA_KEYS["USER_ID"]]
  //     const thatUserId = "PuBuHLn9fyVfAnLQNcPgCPG7vBZ2"
  //     chatsAPI.createChat(thisUserId, thatUserId)
  //   }

  //   return (
  //     <button className="button is-primary" onClick={handleCreateChat}>
  //       Create New Chat
  //     </button>
  //   )
  // }

  const RefreshBtn = () => (
    <button className="button is-info" onClick={handleRefresh}>
      Refresh
    </button>
  )

  return (
    <div className="hero-body">
      <div className="container">
        <div className="is-centered">
          <h2 className="title is-2">Chats</h2>

          <header>
            {/* <TempCreateBtn /> */}

            <RefreshBtn />

            {validChats.length === 0 && (
              <div className="container">
                <div className="MissingPage section">
                  <BiError className="icon is-large is-danger" />
                  <p>No Chats available!</p>
                  <br />
                  <Link to={`${ROUTES.HOME}`} className="button is-warning">
                    Find Matches
                  </Link>
                </div>
              </div>
            )}
          </header>

          {validChats.map(({ [DATA_KEYS["CHAT_ID"]]: chatId, otherUserId }, i) => (
            <div className="card" key={i}>
              <header className="card-header">
                <p className="card-header-title">Chat #{i}</p>
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
  <ChatsProvider>
    <ChatList {...props} />
  </ChatsProvider>
)

export default WrappedChatList
