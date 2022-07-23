import { Message } from "../pages/chat/provider/ChatContext"
import { serviceCall } from "./serviceCall"

interface Request {
  model: string
  feedback: boolean
  messages: Message[]
}

export const feedback = ({ messages, ...rest }: Request) =>
  serviceCall<Request, {}>("POST", `/feedback`, {
    ...rest,
    messages: messages.slice(-9, -1),
  })
