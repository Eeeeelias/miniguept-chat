import { useContext } from "solid-js"

import { ChatContext } from "./ChatContext"

export const useChat = () => useContext(ChatContext)
