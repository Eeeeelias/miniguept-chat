import { createEffect, createMemo, ParentProps } from "solid-js"

import { bots } from "../../../assets/bots"
import {
  createId,
  createStorageSignal,
  dummyData,
} from "../../../components/utils"
import { chat } from "../../../service/chat"
import { BotInstance, ChatContext, Message } from "./ChatContext"

const createInstance = (bot: string): BotInstance => ({
  id: createId(),
  bot,
  messages: [],
})

const initialInstance: BotInstance = {
  ...createInstance(bots[0].name),
  messages: dummyData,
}

const findChat = (chats: BotInstance[], id: string) =>
  chats.find(chat => chat.id === id)

const createMessage = (
  origin: Message["origin"],
  message: string
): Message => ({
  origin,
  message,
  timestamp: new Date().toISOString(),
})

export const ChatProvider = (props: ParentProps) => {
  const [chats, setChats] = createStorageSignal("chat", [initialInstance], {
    sync: true,
  })
  const [active, setActive] = createStorageSignal(
    "active-chat",
    initialInstance.id
  )

  const instance = createMemo(() => {
    const instance = findChat(chats(), active())
    return instance || chats()[0]
  })

  createEffect(() => {
    const chatInstance = findChat(chats(), active())
    if (!chatInstance) setActive(chats()[0].id)
    else if (chatInstance?.messages.length !== instance().messages.length)
      setActive(chatInstance.id)
  })

  const addInstance = (bot: string) =>
    setChats(chats => [...chats, createInstance(bot)])

  const removeInstance = (id: string) => {
    const activeId = active()
    setChats(chats =>
      chats.filter(chat => {
        if (chat.id !== id) return true
        if (chat.id === activeId) setActive(chats[0].id)
        return false
      })
    )
  }

  const pushChatMessage = ({
    id,
    message,
    origin,
  }: {
    id: string
    origin: "user" | "bot"
    message: string
  }) => {
    const instance = findChat(chats(), id)
    if (!instance) return
    setChats(chats =>
      chats.map(chat => {
        if (chat.id !== id) return chat
        return {
          ...chat,
          messages: [...chat.messages, createMessage(origin, message)],
        }
      })
    )
  }

  const requestAnswer = (id: string, message: string) => {
    const instance = findChat(chats(), id)
    if (!instance) return
    const { bot, messages } = instance
    const context = messages.map(({ message }) => message)
    chat(bot, [...context, message]).then(reply =>
      reply.forEach(message => pushChatMessage({ id, message, origin: "bot" }))
    )
  }

  const sendMessage = (message: string) => {
    const current = instance()
    pushChatMessage({ id: current.id, message, origin: "user" })
    requestAnswer(current.id, message)
  }

  const store = {
    chats,
    instance,
    addInstance,
    removeInstance,
    setInstance: setActive,
    sendMessage,
  }

  return (
    <ChatContext.Provider value={store}>{props.children}</ChatContext.Provider>
  )
}
