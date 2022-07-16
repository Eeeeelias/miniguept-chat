import { styled } from "solid-styled-components"

import {
  IconButton,
  TextInput,
  Camera,
  Share,
  Send,
  MoreVertical,
  Smile,
} from "../../components"
import { tokens } from "../../theme"

const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${tokens.space.medium};
`

export const ChatActions = () => {
  return (
    <Layout>
      <TextInput />
      <IconButton icon={Smile} caption="Emojis" />
      <IconButton icon={Send} caption="Send message" />
      <IconButton icon={Camera} caption="Extract picture" />
      <IconButton icon={Share} caption="Share chat context" />
      <IconButton icon={MoreVertical} caption="More actions" />
    </Layout>
  )
}
