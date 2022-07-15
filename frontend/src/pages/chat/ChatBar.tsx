import { styled } from "solid-styled-components"

import minigue from "../../assets/minigue.jpg"
import rick from "../../assets/rick.jpg"
import {
  Icon,
  Sidebar,
  MessageCircle,
  Spacing,
  AvatarButton,
} from "../../components"
import { tokens } from "../../theme"

const Center = styled.div`
  ${args => `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${args.theme?.().fg.muted};
  `}
`
const Divider = styled.div`
  height: 1px;
  width: ${tokens.space.largest};
  background-color: currentColor;
`
const Header = () => (
  <Center>
    <Spacing vertical="smallest">
      <Icon size="large" icon={MessageCircle} inheritColor />
    </Spacing>
    <Divider />
  </Center>
)

export const ChatBar = () => {
  return (
    <Sidebar>
      <Header />
      <AvatarButton src={minigue} caption="Chat with minigue" />
      <AvatarButton src={rick} caption="Chat with rick" />
      <AvatarButton src={""} caption="Chat with jonny" />
    </Sidebar>
  )
}
