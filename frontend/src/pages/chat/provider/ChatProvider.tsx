import { createEffect, createSignal, ParentProps } from "solid-js"

import { bots } from "../../../assets/bots"
import { BotInstance, ChatContext, Message } from "./ChatContext"

const dummyData: Message[] = [
  {
    message: "Hello, how are you?",
    timestamp: new Date("2020-02-25T19:19:00.000Z"),
    origin: "user",
  },
  {
    message: "I'm fine, thank you!",
    timestamp: new Date("2020-02-25T19:20:00.000Z"),
    origin: "bot",
  },
  {
    message: "Why u asking?",
    timestamp: new Date("2020-02-25T19:20:00.000Z"),
    origin: "bot",
  },
  {
    message: "I'm bored... :/",
    timestamp: new Date("2020-02-25T20:36:00.000Z"),
    origin: "user",
  },
  {
    message:
      "Just play some Elden Ring fellow tarnished, its such a great game you should really try it out!",
    timestamp: new Date("2020-02-25T20:37:00.000Z"),
    origin: "bot",
  },
  {
    message:
      "You got me, I am a Malenia simp. Voices in my head won't shut up. Malenia is a good boss yeah yeah, maybe my favorite boss in the game?Yeah sure. THE BEST FROMSOFT BOSS? Fuck it's a good fight why the hell not, the character is cool, the lore too the design as well. The problem is my simp cortex gets activated and thinks 'I could fix her'.",
    timestamp: new Date("2020-02-25T20:38:00.000Z"),
    origin: "user",
  },
]

const createId = () =>
  Math.random().toString(36).slice(-7, -1) +
  Date.now().toString(36).slice(-5, -1)

const createInstance = (bot: string): BotInstance => ({
  id: createId(),
  bot,
  messages: [],
})

const initialInstance = { ...createInstance(bots[0].name), messages: dummyData }

interface ChatProviderProps extends ParentProps {}

export const ChatProvider = (props: ChatProviderProps) => {
  const [chats, setChats] = createSignal<BotInstance[]>([initialInstance])
  const [instance, setInstance] = createSignal(initialInstance)

  const addInstance = (bot: string) =>
    setChats(chats => [...chats, createInstance(bot)])

  const changeInstance = (id: string) => {
    const instance = chats().find(chat => chat.id === id)
    setInstance(instance || chats()[0])
  }

  const sendMessage = (message: string) => {
    const newMessage: Message = {
      message,
      origin: "user",
      timestamp: new Date(),
    }
    const newInstance = { ...instance() }
    newInstance.messages.push(newMessage)

    setInstance(newInstance)
    setChats(chats =>
      chats.map(chat => (chat.id === newInstance.id ? newInstance : chat))
    )
  }

  createEffect(() => {
    console.log(chats())
    console.log(instance())
  })

  const store = {
    chats,
    instance,
    addInstance,
    setInstance: changeInstance,
    sendMessage,
  }

  return (
    <ChatContext.Provider value={store}>{props.children}</ChatContext.Provider>
  )
}
