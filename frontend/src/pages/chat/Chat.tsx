import { styled } from "solid-styled-components"

import { Main } from "../../components"
import { tokens } from "../../theme"
import { Actions } from "./actions/Actions"
import { ChatBar } from "./ChatBar"
import { Messages } from "./Messages"
import { ChatProvider } from "./provider/ChatProvider"

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

export const Chat = () => (
  <ChatProvider>
    <Layout>
      <ChatBar />
      <Content>
        <Messages />
        <Actions />
      </Content>
    </Layout>
  </ChatProvider>
)
