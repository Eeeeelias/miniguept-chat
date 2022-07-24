import { ParentProps, Show } from "solid-js"

import { styled } from "solid-styled-components"

import { Message as MessageData } from "../../pages/chat/provider/ChatContext"
import { tokens } from "../../theme"
import { Text } from "../primitives"
import { ThemeProp } from "../types"

const formatTime = (date: string = "") =>
  new Date(date).toLocaleTimeString(undefined, {
    timeStyle: "short",
  })

type OriginProp = Pick<MessageData, "origin">

const getOriginStyles = (args: OriginProp & ThemeProp) =>
  args.origin === "bot"
    ? `
      background-color: ${args.theme?.().bg.input};
      align-self: flex-start;
      border-bottom-left-radius: 0;
    `
    : `
      background-color: ${args.theme?.().bg.colored};
      align-self: flex-end;
      border-bottom-right-radius: 0;
    `

const triangle = (args: OriginProp & ThemeProp) =>
  args.origin === "bot"
    ? `
      bottom: 0;
      left: -0.5rem;
      width: 0.5rem;
      height: 0.5rem;
      background-color: ${args.theme?.().bg.input};
      clip-path: polygon(0 100%, 100% 0, 100% 100%);
    `
    : `
      bottom: 0;
      right: -0.5rem;
      width: 0.5rem;
      height: 0.5rem;
      background-color: ${args.theme?.().bg.colored};
      clip-path: polygon(0 0, 100% 100%, 0 100%);
    `

const Layout = styled.div<OriginProp>`
  position: relative;
  width: fit-content;
  min-width: 9rem;
  padding: ${tokens.space.medium};
  border-radius: ${tokens.borderRadius};
  gap: ${tokens.space.small};

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  filter: ${args =>
    tokens.shadow.low(args.theme?.().bg.surface, { usage: "drop-shadow" })};

  ${getOriginStyles}
  &::before {
    content: "";
    position: absolute;
    ${triangle}
  }
`

interface MessageProps extends OriginProp, ParentProps {
  timestamp?: string
}

export const Message = (props: MessageProps) => (
  <Layout origin={props.origin}>
    <Text.Medium>{props.children}</Text.Medium>

    <Show when={props.timestamp}>
      <Text.Small muted noWrap>
        {formatTime(props.timestamp)}
      </Text.Small>
    </Show>
  </Layout>
)
