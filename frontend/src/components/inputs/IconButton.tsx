import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { focusOutline, VisuallyHidden } from "../base"
import { Icon } from "../primitives"
import { CaptionProp, IconProp } from "../types"

const Button = styled.button`
  position: relative;
  height: ${tokens.space.large};
  width: ${tokens.space.large};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: ${tokens.space.small};
  overflow: hidden;
  isolation: isolate;

  ${Icon.styled.class} {
    z-index: 2;
  }
  &:focus-visible {
    ${focusOutline}
  }
  &::before {
    content: "";
    position: absolute;
    border-radius: 50%;
    background-color: ${args => args.theme?.().fg.muted};
    opacity: 0;
    inset: 20%;
    transition: 0.2s solid;
    transition-property: inset, opacity;
  }
  &:hover::before {
    inset: 0;
    opacity: 0.3;
  }
`

export interface IconButtonProps extends IconProp, CaptionProp {
  onClick?: () => void
}

export const IconButtonComp = (props: IconButtonProps) => (
  <Button onClick={props.onClick}>
    <Icon icon={props.icon} />
    <VisuallyHidden>{props.caption}</VisuallyHidden>
  </Button>
)

export const IconButton = Object.assign(IconButtonComp, { styled: Button })
