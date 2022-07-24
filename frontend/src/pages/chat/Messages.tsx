import { createEffect, For, onMount, Show } from "solid-js"

import { styled } from "solid-styled-components"

import { Main, Message, Loading } from "../../components"
import { Actions } from "../../components/inputs/Actions"
import { tokens } from "../../theme"
import { useChat } from "./provider/useChat"

const Alignment = styled.div<{ origin: "user" | "bot" }>`
  max-width: 70%;
  align-self: ${args => (args.origin === "bot" ? "flex-start" : "flex-end")};
`

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${tokens.space.medium};
  padding: ${tokens.space.medium} 0;
`

const scrollToBottom = (ref: HTMLElement) => ref.scrollTo(0, ref.scrollHeight)

export const Messages = () => {
  let ref: HTMLDivElement
  const { instance, deleteMessage, waiting, resetTo, vote } = useChat()
  onMount(() => scrollToBottom(ref))

  createEffect(() => {
    if (instance()) scrollToBottom(ref)
    waiting() // triggers waiting animation
  })

  return (
    <Main.ScrollArea ref={r => (ref = r)}>
      <ScrollArea>
        <For each={instance()?.messages}>
          {props => (
            <Alignment origin={props.origin}>
              <Actions
                onDelete={() => deleteMessage(props)}
                onReset={() => resetTo(props.timestamp)}
                onVote={feedback => vote(props.timestamp, feedback)}
                align={props.origin === "bot" ? "left" : "right"}
                vote={props.vote}
                origin={props.origin}
              >
                <Message {...props}>{props.message}</Message>
              </Actions>
            </Alignment>
          )}
        </For>
        <Show when={waiting()}>
          <Message origin="bot">
            <Loading />
          </Message>
        </Show>
      </ScrollArea>
    </Main.ScrollArea>
  )
}
