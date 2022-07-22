import { ParentProps } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { ThemeProp } from "../types/ThemeProp"

type TextSize = "small" | "medium" | "large"

export interface TextProps {
  size?: TextSize
  bold?: boolean
  title?: string
  muted?: boolean
  noWrap?: boolean
  maxWidth?: string
}

const getFontSize = (args: Pick<TextProps, "size">) => {
  if (args.size === "small") return `calc(${tokens.space.medium} * 0.75)`
  if (args.size === "large") return tokens.space.large
  return tokens.space.medium
}

export const getTextStyles = (args: ThemeProp & TextProps) => `
  font-size: ${getFontSize(args)};
  font-weight: ${args.bold ? "700" : "400"};
  color: ${args.muted ? args.theme?.().fg.muted : args.theme?.().fg.base};
  white-space: ${args.noWrap ? "nowrap" : "initial"};
  `

const Font = styled.span<TextProps>`
  ${getTextStyles}
  margin: 0;

  ${args =>
    args.maxWidth
      ? `
        display: inline-block;
        max-width: ${args.maxWidth};
        overflow: hidden;
        text-overflow: ellipsis;
      `
      : ""}
`

type SizedTextProps = ParentProps<Omit<TextProps, "size">> & {
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Small = (props: SizedTextProps) => <Font size="small" {...props} />
const Medium = (props: SizedTextProps) => <Font size="medium" {...props} />
const Large = (props: SizedTextProps) => <Font size="large" {...props} />

export const Text = Object.assign(Font, { Small, Medium, Large })
