import { createEffect } from "solid-js"

import { styled } from "solid-styled-components"

import { IconButton, TextInput, Send } from "../../../components"
import { createCallback } from "../../../components/utils/createCallback"
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
  const { sendMessage, instance } = useChat()

  let instanceId = instance().id
  createEffect(() => {
    const id = instance().id
    if (instanceId !== id) {
      ref.focus()
      instanceId = id
    }
  })

  const send = createCallback(() => {
    if (ref.value === "") return
    sendMessage(ref.value)
    ref.value = ""
  })

  const addEmoji = (emoji: string) => {
    ref.value += emoji
  }

  return (
    <Layout>
      <TextInput
        ref={r => (ref = r)}
        onKeyDown={key => key === "Enter" && send()()}
      />
      <Emojis addEmoji={addEmoji} />
      <IconButton onClick={send()} icon={Send} caption="Send message" />
      <More />
    </Layout>
  )
}
