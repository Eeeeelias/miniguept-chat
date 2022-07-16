import { For, onMount } from "solid-js"

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
  {
    message:
      "You got me, I am a Malenia simp. Voices in my head won't shut up. Malenia is a good boss yeah yeah, maybe my favorite boss in the game?Yeah sure. THE BEST FROMSOFT BOSS? Fuck it's a good fight why the hell not, the character is cool, the lore too the design as well. The problem is my simp cortex gets activated and thinks 'I could fix her'.",
    timestamp: new Date("2020-02-25T20:38:00.000Z"),
    origin: "user",
  },
]

const Layout = styled.div`
  height: calc(100% - 4rem);

  display: flex;
  gap: ${tokens.space.medium};
`

const Content = styled(Main)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${tokens.space.large};
`
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

export const Chat = () => {
  let ref: HTMLDivElement
  onMount(() => scrollToBottom(ref))

  return (
    <Layout>
      <ChatBar />
      <Content>
        <ScrollContainer ref={r => (ref = r)}>
          <For each={dummyData}>{props => <Message {...props} />}</For>
        </ScrollContainer>
        <ChatActions />
      </Content>
    </Layout>
  )
}
