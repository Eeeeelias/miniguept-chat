import { createEffect, For, onMount } from "solid-js"

import { styled } from "solid-styled-components"

import { Message } from "../../components"
import { tokens } from "../../theme"
import { useChat } from "./provider/useChat"

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.medium};
  overflow-y: scroll;
  margin: -0.5rem;
  padding: 0.5rem;
  margin-right: -1.5rem;
  padding-right: 1.5rem;
`

const scrollToBottom = (ref: HTMLElement) => ref.scrollTo(0, ref.scrollHeight)

export const Messages = () => {
  let ref: HTMLDivElement
  const { instance } = useChat()
  onMount(() => scrollToBottom(ref))

  createEffect(() => {
    if (instance()) scrollToBottom(ref)
  })

  return (
    <ScrollContainer ref={r => (ref = r)}>
      <For each={instance()?.messages}>{props => <Message {...props} />}</For>
    </ScrollContainer>
  )
}
