import { Accessor, createContext } from "solid-js"

export interface Message {
  message: string
  timestamp: string
  origin: "user" | "bot"
}

export interface BotInstance {
  id: string
  bot: string
  messages: Message[]
}

export interface ChatState {
  chats: Accessor<BotInstance[]>
  instance: Accessor<BotInstance>
  addInstance: (bot: string) => void
  setInstance: (instanceId: string) => void
  sendMessage: (message: string) => void
}

const emptyInstance = {
  id: "",
  bot: "",
  messages: [],
}

const initialState: ChatState = {
  chats: () => [],
  instance: () => emptyInstance,
  addInstance: () => null,
  setInstance: () => null,
  sendMessage: () => null,
}

export const ChatContext = createContext<ChatState>(initialState)
