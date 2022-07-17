import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { focusOutline, VisuallyHidden } from "../base"
import { Icon, IconSizeProp } from "../primitives"
import { CaptionProp, IconProp } from "../types"

const getButtonSize = ({ size = "medium" }: IconSizeProp) => {
  const value = `calc(${tokens.space[size]} + ${tokens.space.medium})`
  return `
  height: ${value};
  width: ${value};
  min-height: ${value};
  min-width: ${value};
`
}

const IconClass = Icon.styled.class as unknown as string

const Button = styled.button<IconSizeProp>`
  ${getButtonSize}
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: ${tokens.space.small};
  overflow: hidden;
  isolation: isolate;

  ${IconClass} {
    z-index: 2;
    filter: ${args =>
      tokens.shadow.low(args.theme?.().bg.base, { usage: "drop-shadow" })};
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

export interface IconButtonProps extends IconProp, CaptionProp, IconSizeProp {
  onClick?: () => void
}

export const IconButtonComp = (props: IconButtonProps) => (
  <Button onClick={props.onClick} size={props.size}>
    <Icon icon={props.icon} size={props.size} />
    <VisuallyHidden>{props.caption}</VisuallyHidden>
  </Button>
)

export const IconButton = Object.assign(IconButtonComp, { styled: Button })
