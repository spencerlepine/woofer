import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import Messages from "./Messages"
import MessageInput from "./MessageInput"

import "./SampleChat.css"

function SampleChat() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  return (
    <div className="SampleChat">
      <header className="SampleChat-header">React Chat</header>
      {socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  )
}

export default SampleChat
