import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"
import Messages from "./Messages/Messages"
import MessageInput from "./MessageInput/MessageInput"

function SampleChat() {
  const [socket, setSocket] = useState(null)
  const { roomId } = useParams()

  const validRoom = roomId || "testRoom"

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`)
    newSocket.emit("create", validRoom)

    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  return (
    <div id="ChatRoom">
      {socket ? (
        <>
          <div className="columns">
            <div className="column is-two-thirds-mobile is-two-thirds-desktop">
              <h1 className="title">Chatroom</h1>
            </div>
          </div>
          <div className="tile is-ancestor">
            <div className="tile is-8 is-vertical is-parent">
              <Messages socket={socket} />
              <MessageInput socket={socket} />
            </div>
          </div>
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  )
}

export default SampleChat
