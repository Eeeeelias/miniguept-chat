import { createSignal } from "solid-js"

import { styled } from "solid-styled-components"

import minigue from "../../assets/minigue.webp"
import rick from "../../assets/rick.webp"
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

const AllAvatars = () => (
  <TooltipContent>
    <AvatarButton src={minigue} name="minigue" />
    <AvatarButton src={rick} name="rick" />
    <AvatarButton src={""} name="jonny" />
  </TooltipContent>
)

export const ChatBar = () => {
  const [open, setOpen] = createSignal(false)
  return (
    <Sidebar>
      <Header />
      <ScrollContainer>
        <AvatarButton src={minigue} name="minigue" />
        <AvatarButton src={rick} name="rick" />
        <AvatarButton src={""} name="jonny" />
        <Tooltip
          Content={AllAvatars}
          open={open()}
          onClose={() => setOpen(o => !o)}
          position="right"
          align="start"
        >
          <Center>
            <IconButton
              size="large"
              icon={Plus}
              onClick={() => setOpen(o => !o)}
              caption="Start new chat"
            />
          </Center>
        </Tooltip>
      </ScrollContainer>
    </Sidebar>
  )
}
