import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { ThemeProp } from "../base"
import { Text } from "../primitives"

const formatTime = (date: Date) =>
  date.toLocaleTimeString(undefined, {
    timeStyle: "short",
  })

type OriginProp = Pick<MessageProps, "origin">

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
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: ${tokens.space.medium};
  border-radius: ${tokens.borderRadius};
  gap: ${tokens.space.small};
  filter: ${args =>
    tokens.shadow.low(args.theme?.().bg.surface, { usage: "drop-shadow" })};

  max-width: 70%;
  ${getOriginStyles}
  &::before {
    content: "";
    position: absolute;
    ${triangle}
  }
`

export interface MessageProps {
  message: string | string[]
  timestamp: Date
  origin: "user" | "bot"
}

export const Message = (props: MessageProps) => (
  <Layout origin={props.origin}>
    <Text.Medium>{props.message}</Text.Medium>
    <Text.Small muted noWrap>
      {formatTime(props.timestamp)}
    </Text.Small>
  </Layout>
)