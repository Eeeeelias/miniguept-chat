import { styled } from "solid-styled-components"

import { Main } from "../../components"
import { tokens } from "../../theme"
import { ChatActions } from "./ChatActions"
import { ChatBar } from "./ChatBar"

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
      Chat
      <ChatActions />
    </Content>
  </Layout>
)
