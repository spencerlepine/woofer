import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"
import MessageHandler from "./Messages/MessageHandler"
import Messages from "./Messages/Messages"
import MessageInput from "./MessageInput/MessageInput"

import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
import constants from "config/constants"
const { DATA_KEYS } = constants
const idKey = DATA_KEYS["USER_ID"]

import { BiError } from "react-icons/bi"

const ChatMessenger = () => {
  const { currentUser, accountDetails } = useAuth()
  const userDetails = {
    ...(currentUser || {}),
    ...(accountDetails || {}),
  }

  const [socket, setSocket] = useState(null)
  const { roomId } = useParams()

  const validRoom = roomId || "developmentChat"

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`, {
      query: {
        name: `${userDetails["firstName"]} ${userDetails["lastName"]}`,
        userId: userDetails["uid"] || userDetails["userId"],
      },
    })
    newSocket.emit("create", validRoom)

    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket, currentUser, accountDetails])

  return (
    <div className="hero-body">
      <div className="container">
        <div className="is-centered">
          <div id="ChatRoom">
            {socket ? (
              <>
                <div className="columns">
                  <div className="column">
                    <h1 className="title">Chatroom</h1>
                  </div>
                </div>
                <div className="tile is-ancestor">
                  <div className="tile is-vertical is-parent">
                    <MessageHandler
                      socket={socket}
                      chatId={roomId}
                      MessageComponent={Messages}
                    />
                    <MessageInput socket={socket} />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <BiError />
                <p className="title is-3">Not Connected</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const WrappedChat = (props) => (
  <AuthProvider>
    <ChatMessenger {...props} />
  </AuthProvider>
)

export default WrappedChat
