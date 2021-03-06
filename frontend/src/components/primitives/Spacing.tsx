import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { Spacing as SpacingType } from "../../theme/design"
import { ThemeProp } from "../types/ThemeProp"

type SpaceKey = keyof SpacingType
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
  if (explicit) return tokens.space[explicit]

  const isXSide = side === "left" || side === "right"
  if (isXSide && props.horizontal) return tokens.space[props.horizontal]
  const isYSide = side === "top" || side === "bottom"
  if (isYSide && props.vertical) return tokens.space[props.vertical]

  if (props.each) return tokens.space[props.each]

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
