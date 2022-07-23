import { createSignal, ParentComponent, Show } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { focusOutline, VisuallyHidden } from "../base"
import { Tooltip } from "../display"
import { Icon, Text, X } from "../primitives"
import { ThemeProp } from "../types"

const CloseButton = styled.button`
  opacity: 0;
  div:hover > &,
  button:focus + &,
  &:focus {
    opacity: 1;
  }

  position: absolute;
  z-index: 2;
  top: -0.25rem;
  right: -0.25rem;
  height: ${tokens.space.medium};
  width: ${tokens.space.medium};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: ${args => args.theme?.().fg.muted};
  svg {
    color: ${args => args.theme?.().bg.input};
    stroke-width: 3;
  }

  &:focus-visible,
  &:hover {
    background-color: ${args => args.theme?.().alert.danger};
  }
  &:focus-visible {
    ${focusOutline}
    outline-color: ${args => args.theme?.().alert.warning};
    outline-offset: 1px;
  }
`

export interface AvatarButtonProps {
  active?: boolean
  tooltip?: boolean
  name: string
  src?: string
  onClick?: () => void
  onClose?: () => void
}

const fallbackGradient = (args: ThemeProp) => `
  linear-gradient(135deg, ${args.theme?.().accent.base} 20%, ${
  args.theme?.().accent.special
} 80%)
`

const Button = styled.button<AvatarButtonProps>`
  position: relative;
  z-index: 1;
  overflow: hidden;
  min-width: 3.5rem;
  min-height: 3.5rem;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  color: inherit;
  border: 2px solid ${args => args.theme?.().fg.base};

  ${args =>
    args.active
      ? `
        ${focusOutline(args)}
        outline-color: ${args.theme?.().accent.special};
        outline-offset: 2px;
        opacity: 1;
      `
      : ""};

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

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Delete") {
      props.onClose?.()
    }
  }

  // eslint-disable-next-line solid/reactivity
  const ConditionalTooltip: ParentComponent = !props.tooltip
    ? args => <>{args.children}</>
    : args => (
        <Tooltip
          Content={() => (
            <Text.Medium maxWidth="6.5rem" noWrap>
              {props.name}
            </Text.Medium>
          )}
          open={isOpen()}
          position="right"
        >
          {args.children}
        </Tooltip>
      )

  return (
    <ConditionalTooltip>
      <Button
        {...props}
        onMouseEnter={open}
        onMouseLeave={close}
        onKeyDown={handleKeyEvent}
      >
        <VisuallyHidden>Start chatting with {props.name}</VisuallyHidden>
      </Button>
      <Show when={!!props.onClose}>
        <CloseButton onClick={() => props.onClose?.()}>
          <Icon icon={X} size={"small"} />
          <VisuallyHidden>Close chat with {props.name}</VisuallyHidden>
        </CloseButton>
      </Show>
    </ConditionalTooltip>
  )
}
