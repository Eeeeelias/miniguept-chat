import { styled } from "solid-styled-components"

import { Theme } from "../../@types/styled.d"
import { ThemeProp } from "../base/ThemeProp"

type SpaceKey = keyof Theme["space"]
type Side = "left" | "right" | "top" | "bottom"
type SpacingProps = {
  top?: SpaceKey
  right?: SpaceKey
  bottom?: SpaceKey
  left?: SpaceKey
  horizontal?: SpaceKey
  vertical?: SpaceKey
  each?: SpaceKey
  marginLeftAuto?: boolean
  marginRightAuto?: boolean
  inline?: boolean
}

const getSpace = (side: Side, props: SpacingProps & ThemeProp) => {
  const explicit = props[side]
  if (explicit) return props.theme?.().space[explicit]

  const isXSide = side === "left" || side === "right"
  if (isXSide && props.horizontal)
    return props.theme?.().space[props.horizontal]
  const isYSide = side === "top" || side === "bottom"
  if (isYSide && props.vertical) return props.theme?.().space[props.vertical]

  if (props.each) return props.theme?.().space[props.each]

  return 0
}

export const Spacing = styled.div<SpacingProps>`
  ${args => `
    ${args.inline ? "display: inline-block;" : ""}
    padding-top: ${getSpace("top", args)};
    padding-bottom: ${getSpace("bottom", args)};
    padding-left: ${getSpace("left", args)};
    padding-right: ${getSpace("right", args)};

    ${args.marginLeftAuto && "margin-left: auto;"}
    ${args.marginRightAuto && "margin-right: auto;"}
  `}
`
