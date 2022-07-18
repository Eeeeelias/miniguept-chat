import { createEffect, createSignal, For } from "solid-js"

import { styled } from "solid-styled-components"

import { bots } from "../../assets/bots"
import {
  Icon,
  Sidebar,
  MessageCircle,
  Spacing,
  AvatarButton,
  Tooltip,
  Plus,
  IconButton,
} from "../../components"
import { tokens } from "../../theme"
import { useChat } from "./provider/useChat"
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const HeaderLayout = styled(Center)`
  color: ${args => args.theme?.().fg.muted};
`
const Divider = styled.div`
  height: 1px;
  width: ${tokens.space.largest};
  background-color: currentColor;
`
const Header = () => (
  <HeaderLayout>
    <Spacing vertical="smallest">
      <Icon size="large" icon={MessageCircle} inheritColor />
    </Spacing>
    <Divider />
  </HeaderLayout>
)
const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.medium};
  overflow-y: scroll;
  margin: -0.5rem;
  padding: 0.5rem;
`

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.small};
`

const AllAvatars = () => {
  const { addInstance } = useChat()
  return (
    <TooltipContent>
      <For each={bots}>
        {({ avatar, name }) => (
          <AvatarButton
            src={avatar}
            name={name}
            onClick={() => addInstance(name)}
          />
        )}
      </For>
    </TooltipContent>
  )
}

const AddChat = () => {
  const { chats } = useChat()
  const [open, setOpen] = createSignal(false)
  const toggle = () => setOpen(open => !open)
  let chatLength = chats().length

  createEffect(() => {
    if (chatLength !== chats().length) {
      toggle()
      chatLength = chats().length
    }
  })

  return (
    <Tooltip
      Content={AllAvatars}
      open={open()}
      onClose={toggle}
      position="right"
    >
      <Center>
        <IconButton
          size="large"
          icon={Plus}
          onClick={toggle}
          caption="Start new chat"
        />
      </Center>
    </Tooltip>
  )
}

const getBot = (name: string) => {
  const bot = bots.find(bot => bot.name === name)
  return {
    src: bot?.avatar,
    name: bot?.name || "minigue",
  }
}

export const ChatBar = () => {
  const { chats, setInstance } = useChat()
  return (
    <Sidebar>
      <Header />
      <ScrollContainer>
        <For each={chats()}>
          {({ bot, id }) => (
            <AvatarButton {...getBot(bot)} onClick={() => setInstance(id)} />
          )}
        </For>
        <AddChat />
      </ScrollContainer>
    </Sidebar>
  )
}
