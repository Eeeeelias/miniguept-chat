import { serviceCall } from "./serviceCall"

interface Resquonst {
  messages: string[]
}

export const chat = (bot: string, messages: string[]) =>
  serviceCall<Resquonst, Resquonst>("POST", `/${bot}`, {
    messages: messages.slice(0, 8),
  }).then(({ messages }) => messages)
