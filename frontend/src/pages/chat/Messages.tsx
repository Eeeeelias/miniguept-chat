import { createEffect, For, onMount } from "solid-js"

import { Main, Message } from "../../components"
import { useChat } from "./provider/useChat"

const scrollToBottom = (ref: HTMLElement) => ref.scrollTo(0, ref.scrollHeight)

export const Messages = () => {
  let ref: HTMLDivElement
  const { instance, deleteMessage } = useChat()
  onMount(() => scrollToBottom(ref))

  createEffect(() => {
    if (instance()) scrollToBottom(ref)
  })

  return (
    <Main.ScrollArea ref={r => (ref = r)}>
      <For each={instance()?.messages}>
        {props => <Message {...props} onDelete={() => deleteMessage(props)} />}
      </For>
    </Main.ScrollArea>
  )
}
