import { splitProps } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { FeatherIcon } from "./icons"

type SizeProp = { size?: "medium" | "large" | "largest" }

const getSize = ({ size }: SizeProp) => tokens.space[size || "medium"]

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

export interface IconProps extends SizeProp {
  icon: FeatherIcon
  inheritColor?: boolean
}

export const Icon = (props: IconProps) => {
  const [{ icon: Icon }, delegated] = splitProps(props, ["icon"])
  return (
    <StyledIcon {...delegated}>
      <Icon />
    </StyledIcon>
  )
}
