import React, { useState, useRef, useEffect } from "react"
import ChatMessage from "./ChatMessage"

const Messages = ({ messages, currentUserId }) => {
  const scrollRef = useRef(null)

  // useEffect(() => {
  //   if (scrollRef && scrollRef.current) {
  //     const { current: chatWindow } = scrollRef
  //     chatWindow.scrollTop = chatWindow.scrollHeight;
  //     chatWindow.scrollTop = 9999
  //     console.log(chatWindow.scrollTop, chatWindow.scrollHeight)
  //   }
  // }, [scrollRef])

  // const sortMessages = (a, b) => a.time - b.time
  const sortMessages = (a, b) => b.time - a.time

  return (
    <div className="tile is-child box messagesWindow" ref={scrollRef}>
      {[...Object.values(messages)].sort(sortMessages).map((message, i) => (
        <ChatMessage message={message} key={i} currentUserId={currentUserId} />
      ))}
    </div>
  )
}

export default Messages
