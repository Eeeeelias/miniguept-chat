import { ParentProps } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { focusOutline } from "../base"
import { Text } from "../primitives"

const Btn = styled.button<Pick<ButtonProps, "look">>`
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${tokens.space.large};
  padding: 0 calc(${tokens.space.medium} * 0.75);

  border-radius: ${tokens.space.small};
  overflow: hidden;
  box-shadow: ${args => tokens.shadow.low(args.theme?.().bg.base)};

  ${args =>
    args.look === "border"
      ? `
        border: 1px solid ${args.theme?.().fg.muted};
      `
      : `
        background-color: ${args.theme?.().bg.input};
      `}

  &:hover {
    background-color: ${args => args.theme?.().bg.highlight};
  }

  &:focus-visible {
    ${focusOutline}
  }
`

export interface ButtonProps extends ParentProps {
  onClick?: () => void
  look: "filled" | "border"
}

export const Button = (props: ButtonProps) => (
  <Btn onClick={props.onClick} look={props.look}>
    <Text.Medium>{props.children}</Text.Medium>
  </Btn>
)
