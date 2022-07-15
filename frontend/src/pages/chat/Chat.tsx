import { styled } from "solid-styled-components"

import { Main } from "../../components"
import { tokens } from "../../theme"
import { ChatBar } from "./ChatBar"

const Layout = styled.div`
  height: 100%;

  display: flex;
  gap: ${tokens.space.medium};
`

export const Chat = () => (
  <Layout>
    <ChatBar />
    <Main>Chat</Main>
  </Layout>
)
