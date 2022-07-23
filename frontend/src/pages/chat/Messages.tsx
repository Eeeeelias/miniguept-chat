import { createEffect, For, onMount, Show } from "solid-js"

import { Main, Message, Loading } from "../../components"
import { useChat } from "./provider/useChat"

const scrollToBottom = (ref: HTMLElement) => ref.scrollTo(0, ref.scrollHeight)

export const Messages = () => {
  let ref: HTMLDivElement
  const { instance, deleteMessage, waiting } = useChat()
  onMount(() => scrollToBottom(ref))

  createEffect(() => {
    if (instance()) scrollToBottom(ref)
    console.log(waiting())
  })

  return (
    <Main.ScrollArea ref={r => (ref = r)}>
      <For each={instance()?.messages}>
        {props => (
          <Message {...props} onDelete={() => deleteMessage(props)}>
            {props.message}
          </Message>
        )}
      </For>
      <Show when={waiting()}>
        <Message origin="bot">
          <Loading />
        </Message>
      </Show>
    </Main.ScrollArea>
  )
}
