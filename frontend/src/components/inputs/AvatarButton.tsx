import { styled } from "solid-styled-components"

import { focusOutline, ThemeProp, VisuallyHidden } from "../base"

export interface AvatarButtonProps {
  caption?: string
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
  border: 2px solid currentColor;

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

export const AvatarButton = (props: AvatarButtonProps) => (
  <Button title={props.caption} {...props}>
    <VisuallyHidden>{props.caption}</VisuallyHidden>
  </Button>
)
