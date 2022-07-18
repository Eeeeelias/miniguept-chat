import { createSignal } from "solid-js"

import { styled } from "solid-styled-components"

import { focusOutline, ThemeProp, VisuallyHidden } from "../base"
import { Tooltip } from "../display"
import { Text } from "../primitives"

export interface AvatarButtonProps {
  name: string
  src?: string
  onClick?: () => void
}

const fallbackGradient = (args: ThemeProp) => `
  linear-gradient(135deg, ${args.theme?.().accent.base} 20%, ${
  args.theme?.().accent.special
} 80%)
`

const Button = styled.button<AvatarButtonProps>`
  position: relative;
  overflow: hidden;
  width: 3.5rem;
  min-height: 3.5rem;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  color: inherit;
  border: 2px solid ${args => args.theme?.().fg.base};

  &:focus-visible {
    ${focusOutline}
  }
  &:hover,
  &:focus-visible {
    opacity: 1;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${fallbackGradient};
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${args => args.src});
    background-size: cover;
    background-position: center;
  }
`

export const AvatarButton = (props: AvatarButtonProps) => {
  const [isOpen, setOpen] = createSignal(false)
  const close = () => setOpen(false)
  const open = () => setOpen(true)

  return (
    <Tooltip
      Content={() => <Text.Medium noWrap>{props.name}</Text.Medium>}
      open={isOpen()}
      position="right"
    >
      <Button {...props} onMouseEnter={open} onMouseLeave={close}>
        <VisuallyHidden>Start chatting with {props.name}</VisuallyHidden>
      </Button>
    </Tooltip>
  )
}
