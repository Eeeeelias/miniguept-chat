import { splitProps } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { focusOutline, inputShadow } from "../base"

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0 ${tokens.space.medium};
  background: ${args => args.theme?.().bg.input};
  border-radius: ${tokens.space.small};
  border: 1px solid ${args => args.theme?.().bg.highlight};
  ${inputShadow}

  &:focus-visible {
    ${focusOutline}
  }

  &[disabled] {
    opacity: 0.1;
    background: ${args => args.theme?.().fg.muted};
  }
`

export interface TextInputProps {
  ref?: (ref: HTMLInputElement) => void
  placeholder?: string
  onChange?: (value: string) => void
  onKeyDown?: (key: string) => void
  disabled?: boolean
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
