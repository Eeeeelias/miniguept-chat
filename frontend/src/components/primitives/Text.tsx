import { ParentProps } from "solid-js"

import { styled } from "solid-styled-components"

import { Theme } from "../../@types/styled.d"
import { ThemeProp } from "../base/ThemeProp"

type TextSize = "small" | "medium" | "large"

export interface TextProps {
  size?: TextSize
  bold?: boolean
  title?: string
}

const getFontSize = (args: Theme & Pick<TextProps, "size">) => {
  if (args.size === "small") return `calc(${args.space.medium} * 0.75)`
  if (args.size === "large") return `calc(${args.space.medium} * 2)`
  return args.space.medium
}

export const getTextStyles = (args: ThemeProp & TextProps) => `
  font-size: ${getFontSize};
  font-weight: ${args.bold ? "700" : "400"};
  color: ${args.theme?.().color.fg.base};
`

const Font = styled.span<TextProps>`
  ${getTextStyles}
  margin: 0;
`

type SizedTextProps = ParentProps<Omit<TextProps, "size">> & {
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Small = (props: SizedTextProps) => <Font size="small" {...props} />
const Medium = (props: SizedTextProps) => <Font size="medium" {...props} />
const Large = (props: SizedTextProps) => <Font size="large" {...props} />

export const Text = Object.assign(Font, { Small, Medium, Large })
