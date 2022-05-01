import React, { useState, useEffect } from "react"
import * as chatsAPI from "api/chats"

const MessageHandler = (props) => {
  const { chatId, socket, MessageComponent } = props

  const [messages, setMessages] = useState({})

  const messageListener = (message) => {
    const { messageId } = message
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages }
      newMessages[messageId] = message
      return newMessages
    })
  }

  useEffect(() => {
    if (Object.values(messages).length === 0) {
      chatsAPI.fetchChatHistory(chatId, (newMessages) => {
        newMessages.forEach(messageListener)
      })
    }
  }, [])

  useEffect(() => {
    const deleteMessageListener = (messageId) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        delete newMessages[messageId]
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

  return <MessageComponent {...props} messages={messages} />
}

export default MessageHandler
