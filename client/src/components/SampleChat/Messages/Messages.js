import React, { useEffect, useState } from "react"
import ChatMessage from "./ChatMessage"

function Messages({ socket }) {
  const [messages, setMessages] = useState({})

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        newMessages[message.id] = message
        return newMessages
      })
    }

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        delete newMessages[messageID]
        return newMessages
      })
    }

    socket.on("message", messageListener)
    socket.on("deleteMessage", deleteMessageListener)
    socket.emit("getMessages")

    return () => {
      socket.off("message", messageListener)
      socket.off("deleteMessage", deleteMessageListener)
    }
  }, [socket])

  return (
    <div className="tile is-child box">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message, i) => (
          <ChatMessage message={message} key={i} />
        ))}
    </div>
  )
}

export default Messages
