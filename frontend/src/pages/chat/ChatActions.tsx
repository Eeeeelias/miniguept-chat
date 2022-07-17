import { createSignal } from "solid-js"

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
import { Tooltip } from "../../components/display/tooltip/Tooltip"
import { tokens } from "../../theme"

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.small};
`

const MoreActions = () => (
  <TooltipContent>
    <IconButton icon={Camera} caption="Extract picture" />
    <IconButton icon={Share} caption="Share chat context" />
  </TooltipContent>
)

const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${tokens.space.small};
`

export const ChatActions = () => {
  const [open, setOpen] = createSignal(false)
  return (
    <Layout>
      <TextInput />
      <IconButton icon={Smile} caption="Emojis" />
      <IconButton icon={Send} caption="Send message" />
      <Tooltip
        Content={MoreActions}
        open={open()}
        onClose={() => setOpen(o => !o)}
        position="top"
        align="start"
      >
        <IconButton
          icon={MoreVertical}
          onClick={() => setOpen(o => !o)}
          caption="More actions"
        />
      </Tooltip>
    </Layout>
  )
}
