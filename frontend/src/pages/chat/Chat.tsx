import { For } from "solid-js"

import { styled } from "solid-styled-components"

import { Main, Message, MessageProps } from "../../components"
import { tokens } from "../../theme"
import { ChatActions } from "./ChatActions"
import { ChatBar } from "./ChatBar"

const dummyData: MessageProps[] = [
  {
    message: "Hello, how are you?",
    timestamp: new Date("2020-02-25T19:19:00.000Z"),
    origin: "user",
  },
  {
    message: "I'm fine, thank you!",
    timestamp: new Date("2020-02-25T19:20:00.000Z"),
    origin: "bot",
  },
  {
    message: "Why u asking?",
    timestamp: new Date("2020-02-25T19:20:00.000Z"),
    origin: "bot",
  },
  {
    message: "I'm bored... :/",
    timestamp: new Date("2020-02-25T20:36:00.000Z"),
    origin: "user",
  },
  {
    message:
      "Just play some Elden Ring fellow tarnished, its such a great game you should really try it out!",
    timestamp: new Date("2020-02-25T20:37:00.000Z"),
    origin: "bot",
  },
]

const Layout = styled.div`
  height: 100%;

  display: flex;
  gap: ${tokens.space.medium};
`

const Content = styled(Main)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${tokens.space.medium};
`

export const Chat = () => (
  <Layout>
    <ChatBar />
    <Content>
      <For each={dummyData}>{props => <Message {...props} />}</For>
      <ChatActions />
    </Content>
  </Layout>
)
