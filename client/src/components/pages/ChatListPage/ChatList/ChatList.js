import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { BiError } from "react-icons/bi"
import { MdRefresh as RefreshIcon } from "react-icons/md"

import * as ROUTES from "config/routeConstants"
import * as chatsAPI from "api/chats"

const chatsKey = "chats"

import useChats, { ChatsProvider } from "context/ChatsContext/ChatsContext"
import useAuth from "context/AuthContext/AuthContext"

import OpenChatLink from "./OpenChatLink/OpenChatLink"

const ChatList = () => {
  const { availableChats, fetchUserChats, loading } = useChats()
  const { currentUser, accountDetails } = useAuth()

  const validChats = availableChats

  const handleRefresh = () => {
    if (currentUser && currentUser["userId"]) {
      const userId = currentUser["userId"]
      fetchUserChats(userId)
    }
  }

  useEffect(() => {
    if (currentUser && currentUser["userId"]) {
      handleRefresh()
    }
  }, [currentUser])

  const RefreshBtn = () => (
    <button className="button is-info" onClick={handleRefresh} disabled={loading}>
      Refresh
      <RefreshIcon />
    </button>
  )

  return (
    <div className="swiper container m-4">
      <div className="columns is-centered">
        <div className="column is-half">
          <h2 className="title is-2">Chats</h2>

          <header>
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

          {validChats.map(({ chatId, otherUserId }, i) => (
            <OpenChatLink key={i} i={i} chatId={chatId} otherUserId={otherUserId} />
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
