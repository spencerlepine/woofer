import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"
import { IoSettingsSharp as SettingsIcon } from "react-icons/io5"
import MessageHandler from "./Messages/MessageHandler"
import Messages from "./Messages/Messages"
import MessageInput from "./MessageInput/MessageInput"
import ChatInfoPopUp from "./ChatInfoPopUp/ChatInfoPopUp"
import config from "config/config"
const { SERVER_URL } = config

import useChats, { ChatsProvider } from "context/ChatsContext/ChatsContext"

import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
const idKey = "userId"

import { BiError } from "react-icons/bi"

const ChatMessenger = () => {
  const [renderInfo, setRenderInfo] = useState(false)
  const { currentUser, accountDetails } = useAuth()
  const { otherUserDetails, fetchOtherUserDetails } = useChats()

  const userDetails = {
    ...(currentUser || {}),
    ...(accountDetails || {}),
  }

  const [socket, setSocket] = useState(null)
  const { roomId, otherUserId } = useParams()

  const validRoom = roomId || "developmentChat"
  const userId = userDetails["uid"] || userDetails["userId"]

  const otherUserName = `${otherUserDetails["firstName"]} ${otherUserDetails["lastName"]}`

  const extractProfileImage = (userObj) => {
    const missingImg =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    try {
      const { profilePicture } = userObj
      return profilePicture || missingImg
    } catch (err) {
      return missingImg
    }
  }

  useEffect(() => {
    const newSocket = io(`${SERVER_URL}`, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        transports: ["websocket", "polling"],
        credentials: true,
      },
      allowEIO3: true,
      query: {
        name: userDetails["username"],
        userId: userId,
      },
    })
    newSocket.emit("create", validRoom)

    setSocket(newSocket)

    fetchOtherUserDetails(otherUserId)

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
                    <span style={{ display: "inline-flex" }}>
                      <figure className="image is-64x64">
                        <img
                          className="is-rounded chatProfilePic"
                          src={extractProfileImage(otherUserDetails)}
                          alt="Profile Picture"
                        ></img>
                      </figure>

                      <h1 className="title my-auto px-2">{otherUserName}</h1>

                      <button
                        className="button is-info my-auto"
                        onClick={() => setRenderInfo(!renderInfo)}
                      >
                        <SettingsIcon />
                      </button>
                    </span>
                  </div>
                </div>
                <div className="tile is-ancestor">
                  <div className="tile is-vertical is-parent">
                    <MessageHandler
                      socket={socket}
                      chatId={roomId}
                      MessageComponent={Messages}
                      currentUserId={userDetails["uid"] || userDetails["userId"]}
                    />
                    <MessageInput socket={socket} />
                  </div>
                </div>
                {renderInfo && (
                  <ChatInfoPopUp
                    closePopup={() => setRenderInfo(false)}
                    userId={userId}
                    chatId={roomId}
                    otherUserId={otherUserId}
                    otherUserDetails={otherUserDetails}
                  />
                )}
              </>
            ) : (
              <div>
                <BiError />
                <p className="title is-3">Not Connected</p>
                <div className="section is-vcentered">
                  <div className="columns  is-flex is-vcentered">
                    <div className="column is-6 mx-auto">
                      <h2 className="title is-2">
                        <div className="loader-wrapper mx-auto">
                          <div className="loader is-loading mx-auto"></div>
                        </div>
                      </h2>
                    </div>
                  </div>
                </div>
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
    <ChatsProvider>
      <ChatMessenger {...props} />
    </ChatsProvider>
  </AuthProvider>
)

export default WrappedChat
