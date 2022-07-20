import { serviceCall } from "./serviceCall"

interface Resquonst {
  messages: string[]
}

export const chat = (bot: string, messages: string[]) =>
  serviceCall<Resquonst, Resquonst>("POST", `/${bot}`, {
    messages: messages.slice(-9, -1),
  }).then(({ messages }) => messages)
