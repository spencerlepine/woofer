import React from "react"
import ChatMessenger from "./ChatMessenger/ChatMessenger"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const ChatPage = () => <ChatMessenger />

const isAuthPage = false
export default withAuthRedirect(ChatPage, isAuthPage)
