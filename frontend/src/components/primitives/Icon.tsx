import { splitProps } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { IconProp } from "../types/IconProp"

export type IconSizeProp = { size?: "medium" | "large" | "largest" }

const getSize = ({ size = "medium" }: IconSizeProp) =>
  size === "largest"
    ? tokens.space.large
    : size === "large"
    ? "1.5rem"
    : tokens.space.medium

const StyledIcon = styled("span")<Omit<IconProps, "icon">>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${args => (args.inheritColor ? "inherit" : args.theme?.().fg.base)};

  &,
  > svg {
    height: ${getSize};
    width: ${getSize};
  }
`

export interface IconProps extends IconSizeProp, IconProp {
  inheritColor?: boolean
}

const IconComp = (props: IconProps) => {
  const [{ icon: Icon }, delegated] = splitProps(props, ["icon"])
  return (
    <StyledIcon {...delegated}>
      <Icon />
    </StyledIcon>
  )
}

export const Icon = Object.assign(IconComp, { styled: StyledIcon })
