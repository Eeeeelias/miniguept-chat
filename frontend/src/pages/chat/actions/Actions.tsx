import { createMemo } from "solid-js"

import { styled } from "solid-styled-components"

import { IconButton, TextInput, Send } from "../../../components"
import { tokens } from "../../../theme"
import { useChat } from "../provider/useChat"
import { Emojis } from "./Emojis"
import { More } from "./More"

const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${tokens.space.small};
`

export const Actions = () => {
  let ref: HTMLInputElement
  const { sendMessage } = useChat()

  const addEmoji = (emoji: string) => {
    ref.value += emoji
  }

  const send = createMemo(() => () => {
    sendMessage(ref.value)
    ref.value = ""
  })

  return (
    <Layout>
      <TextInput ref={r => (ref = r)} />
      <Emojis addEmoji={addEmoji} />
      <IconButton onClick={send()} icon={Send} caption="Send message" />
      <More />
    </Layout>
  )
}
