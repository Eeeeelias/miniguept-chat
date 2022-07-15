import { splitProps } from "solid-js"

import { styled, DefaultTheme } from "solid-styled-components"

import { FeatherIcon } from "./icons"

type SizeProp = { size?: "medium" | "large" | "largest" }
type ThemeProp = { theme?: DefaultTheme }

const getSize = ({ theme, size }: ThemeProp & SizeProp) =>
  theme?.().space[size || "medium"]

const StyledIcon = styled("span")<Omit<IconProps, "icon">>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${props =>
    props.inheritColor ? "inherit" : props.theme?.().color.fg.base};

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
