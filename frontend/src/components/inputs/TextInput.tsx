import { splitProps } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { focusOutline } from "../base"

const Input = styled.input`
  width: 100%;
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

export interface TextInputProps {
  ref?: (ref: HTMLInputElement) => void
  placeholder?: string
  onChange?: (value: string) => void
  onKeyDown?: (key: string) => void
}

export const TextInput = (props: TextInputProps) => {
  const [{ onChange, onKeyDown }, rest] = splitProps(props, [
    "onChange",
    "onKeyDown",
  ])
  return (
    <Input
      type="text"
      onChange={e => onChange?.(e.currentTarget.value)}
      onKeyDown={e => onKeyDown?.(e.key)}
      {...rest}
    />
  )
}
