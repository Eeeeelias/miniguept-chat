import { styled } from "solid-styled-components"

import minigue from "../../assets/minigue.webp"
import rick from "../../assets/rick.webp"
import {
  Icon,
  Sidebar,
  MessageCircle,
  Spacing,
  AvatarButton,
} from "../../components"
import { tokens } from "../../theme"

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${args => args.theme?.().fg.muted};
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
const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.medium};
  overflow-y: scroll;
  margin-right: -0.5rem;
  padding-right: 0.5rem;
`

export const ChatBar = () => {
  return (
    <Sidebar>
      <Header />
      <ScrollContainer>
        <AvatarButton src={minigue} name="minigue" />
        <AvatarButton src={rick} name="rick" />
        <AvatarButton src={""} name="jonny" />
      </ScrollContainer>
    </Sidebar>
  )
}
