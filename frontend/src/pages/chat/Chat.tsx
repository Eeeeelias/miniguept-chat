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

  > main {
    height: 100%;
    justify-content: flex-end;
  }
`

export const Chat = () => (
  <ChatProvider>
    <Layout>
      <ChatBar />
      <Main>
        <Messages />
        <Actions />
      </Main>
    </Layout>
  </ChatProvider>
)
