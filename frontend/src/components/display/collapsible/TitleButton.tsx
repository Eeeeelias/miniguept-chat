import { styled } from "solid-styled-components"

import { tokens } from "../../../theme"
import { focusOutline } from "../../base"

export const AccordionButton = styled.button<{ open: boolean }>`
  background-color: ${args => args.theme?.().bg.input};
  width: 100%;
  height: ${tokens.space.largest};
  padding: 0 ${tokens.space.medium};
  border-radius: ${tokens.borderRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    transition: transform 0.1s ease-out;
    transform: rotate(${args => (args.open ? "-90deg" : "0")});
  }

  &:hover,
  &:focus-visible {
    background-color: ${args => args.theme?.().bg.highlight};
  }
  &:focus-visible {
    ${focusOutline}
  }
`
