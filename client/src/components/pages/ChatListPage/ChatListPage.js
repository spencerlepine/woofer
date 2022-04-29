import React from "react"
import ChatList from "./ChatList/ChatList"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const ChatListPage = () => <ChatList />

// TODO, return this
const isAuthPage = false
export default ChatListPage //withAuthRedirect(ChatListPage, isAuthPage)
