import { Message } from "../../pages/chat/provider/ChatContext"

export const dummyData: Message[] = [
  {
    message: "Hello, how are you?",
    timestamp: new Date("2020-02-25T19:19:00.000Z").toISOString(),
    origin: "user",
  },
  {
    message: "I'm fine, thank you!",
    timestamp: new Date("2020-02-25T19:20:00.000Z").toISOString(),
    origin: "bot",
  },
  {
    message: "Why u asking?",
    timestamp: new Date("2020-02-25T19:20:00.000Z").toISOString(),
    origin: "bot",
  },
  {
    message: "I'm bored... :/",
    timestamp: new Date("2020-02-25T20:36:00.000Z").toISOString(),
    origin: "user",
  },
  {
    message:
      "Just play some Elden Ring fellow tarnished, its such a great game you should really try it out!",
    timestamp: new Date("2020-02-25T20:37:00.000Z").toISOString(),
    origin: "bot",
  },
  {
    message:
      "You got me, I am a Malenia simp. Voices in my head won't shut up. Malenia is a good boss yeah yeah, maybe my favorite boss in the game?Yeah sure. THE BEST FROMSOFT BOSS? Fuck it's a good fight why the hell not, the character is cool, the lore too the design as well. The problem is my simp cortex gets activated and thinks 'I could fix her'.",
    timestamp: new Date("2020-02-25T20:38:00.000Z").toISOString(),
    origin: "user",
  },
]
