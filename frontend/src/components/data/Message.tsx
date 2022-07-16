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

const Layout = styled.div<OriginProp>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: ${tokens.space.medium};
  border-radius: ${tokens.borderRadius};
  gap: ${tokens.space.smallest};

  max-width: 70%;
  ${getOriginStyles}
`

export interface MessageProps {
  message: string
  timestamp: Date
  origin: "user" | "bot"
}

export const Message = (props: MessageProps) => (
  <Layout origin={props.origin}>
    <Text.Medium>{props.message}</Text.Medium>
    <Text.Small muted>{formatTime(props.timestamp)}</Text.Small>
  </Layout>
)
