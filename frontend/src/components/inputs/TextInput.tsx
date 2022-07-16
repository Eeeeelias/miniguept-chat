import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { focusOutline } from "../base"

const Input = styled.input`
  height: 2.5rem;
  padding: 0 ${tokens.space.medium};
  background: ${args => args.theme?.().bg.input};
  border-radius: ${tokens.space.small};
  border: 1px solid ${args => args.theme?.().bg.highlight};
  box-shadow: ${args => tokens.shadow.low(args.theme?.().bg.surface)};

  &:focus-visible {
    ${focusOutline}
  }
`

export const TextInput = () => <Input type="text" style={{ width: "100%" }} />
