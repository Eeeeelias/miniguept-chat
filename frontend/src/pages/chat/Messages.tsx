import { createEffect, For, onMount, Show } from "solid-js"

import { styled } from "solid-styled-components"

import { Main, Message, Loading } from "../../components"
import { Actions, ActionsProps } from "../../components/inputs/Actions"
import { tokens } from "../../theme"
import { ChatState, Message as MessageData } from "./provider/ChatContext"
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

const getActionsProps = (args: MessageData, chat: ChatState): ActionsProps =>
  args.origin === "bot"
    ? {
        onDelete: () => chat.deleteMessage(args),
        onVote: feedback => chat.vote(args.timestamp, feedback),
        align: "left",
        vote: args.vote,
      }
    : {
        onDelete: () => chat.deleteMessage(args),
        onReset: () => chat.resetTo(args.timestamp),
        align: "right",
      }

export const Messages = () => {
  let ref: HTMLDivElement
  const chat = useChat()
  onMount(() => scrollToBottom(ref))

  createEffect(() => {
    if (chat.instance()) scrollToBottom(ref)
    chat.waiting() // triggers waiting animation
  })

  return (
    <Main.ScrollArea ref={r => (ref = r)}>
      <ScrollArea>
        <For each={chat.instance()?.messages}>
          {props => (
            <Alignment origin={props.origin}>
              <Actions {...getActionsProps(props, chat)}>
                <Message {...props}>{props.message}</Message>
              </Actions>
            </Alignment>
          )}
        </For>
        <Show when={chat.waiting()}>
          <Message origin="bot">
            <Loading />
          </Message>
        </Show>
      </ScrollArea>
    </Main.ScrollArea>
  )
}
