import { Message } from "../pages/chat/provider/ChatContext"

export const dummyData: Message[] = [
  {
    message: "Hello there, Hooman 😎",
    timestamp: new Date().toISOString(),
    origin: "bot",
  },
  {
    message:
      "I will be your chatting partner on this page, you can always count on me! 😊",
    timestamp: new Date().toISOString(),
    origin: "bot",
  },
  {
    message:
      "If you have any questions, have a look at my help page on the top. You can also find more information about me on the about page.",
    timestamp: new Date().toISOString(),
    origin: "bot",
  },
  {
    message:
      "In the case there is anything else you need, feel free to contact my creators. Check out the github repository which you can find on the top right.",
    timestamp: new Date().toISOString(),
    origin: "bot",
  },
  {
    message: "Now, lets start chatting! 😁",
    timestamp: new Date().toISOString(),
    origin: "bot",
  },
]
