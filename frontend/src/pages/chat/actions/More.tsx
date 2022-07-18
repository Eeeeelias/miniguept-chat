import { createSignal } from "solid-js"

import { styled } from "solid-styled-components"

import { IconButton, Camera, Share, MoreVertical } from "../../../components"
import { Tooltip } from "../../../components/display/tooltip/Tooltip"
import { tokens } from "../../../theme"

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

export const More = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <Tooltip
      Content={MoreActions}
      open={open()}
      onClose={() => setOpen(o => !o)}
      position="top"
    >
      <IconButton
        icon={MoreVertical}
        onClick={() => setOpen(o => !o)}
        caption="More actions"
      />
    </Tooltip>
  )
}
