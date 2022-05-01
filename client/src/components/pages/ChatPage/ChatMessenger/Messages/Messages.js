import React from "react"
import ChatMessage from "./ChatMessage"

const Messages = ({ messages, currentUserId }) => {
  return (
    <div className="tile is-child box">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message, i) => (
          <ChatMessage message={message} key={i} currentUserId={currentUserId} />
        ))}
    </div>
  )
}

export default Messages
