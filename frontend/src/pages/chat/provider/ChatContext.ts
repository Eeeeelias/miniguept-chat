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
  waiting: Accessor<boolean>
  addInstance: (bot: string) => void
  setInstance: (instanceId: string) => void
  removeInstance: (instanceId: string) => void
  sendMessage: (message: string) => void
  deleteMessage: (message: Message) => void
  resetTo: (timestamp: string) => void
  vote: (timestamp: string, vote: boolean) => void
}

const emptyInstance = {
  id: "",
  bot: "",
  messages: [],
}

const initialState: ChatState = {
  chats: () => [],
  instance: () => emptyInstance,
  waiting: () => false,
  addInstance: () => null,
  setInstance: () => null,
  removeInstance: () => null,
  sendMessage: () => null,
  deleteMessage: () => null,
  resetTo: () => null,
  vote: () => null,
}

export const ChatContext = createContext<ChatState>(initialState)
