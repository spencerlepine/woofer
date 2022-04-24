import React, { useEffect, useState } from "react"

function ChatMessage({ message }) {
  const {
    id: message_id,
    time,
    user: { name },
    value,
  } = message

  return (
    <div
      key={message_id}
      className="message-container"
      title={`Sent at ${new Date(time).toLocaleTimeString()}`}
    >
      <span className="user">{name}:</span>
      <span className="message">{value}</span>
      <span className="date">{new Date(time).toLocaleTimeString()}</span>
    </div>
  )
}

export default ChatMessage
