import { createEffect, createSignal, For } from "solid-js"

import { styled } from "solid-styled-components"

import {
  Icon,
  Sidebar,
  MessageCircle,
  Spacing,
  AvatarButton,
  Tooltip,
  Plus,
  IconButton,
  Text,
  focusOutline,
} from "../../components"
import { bots } from "../../data/bots"
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
  overflow-y: auto;
  margin: -0.5rem;
  padding: 0.5rem;
`

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.small};
`

const AddAvatar = styled.button`
  display: flex;
  align-items: center;
  gap: ${tokens.space.small};
  padding-right: ${tokens.space.medium};
  border-radius: 50vh;
  cursor: pointer;
  &:hover,
  &:focus-visible {
    background-color: ${args => args.theme?.().bg.highlight};
  }
  &:focus-visible {
    ${focusOutline}
  }
`

const AllAvatars = () => {
  const { addInstance } = useChat()
  return (
    <TooltipContent>
      <For each={bots}>
        {({ avatar, name }) => (
          <AddAvatar onClick={() => addInstance(name)}>
            <AvatarButton src={avatar} name={name} small={true} />
            <Text.Medium maxWidth="6.5rem" noWrap>
              {name}
            </Text.Medium>
          </AddAvatar>
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
  const { chats, setInstance, instance, removeInstance } = useChat()
  return (
    <Sidebar>
      <Header />
      <ScrollContainer>
        <For each={chats()}>
          {({ bot, id }) => (
            <AvatarButton
              active={instance().id === id}
              tooltip
              onClick={() => setInstance(id)}
              onClose={
                chats().length > 1 ? () => removeInstance(id) : undefined
              }
              {...getBot(bot)}
            />
          )}
        </For>
        <AddChat />
      </ScrollContainer>
    </Sidebar>
  )
}
