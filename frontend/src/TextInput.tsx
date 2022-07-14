import { styled } from "solid-styled-components"

const Input = styled.input`
  height: 3rem;
  width: 100%;
  padding: 0 1rem;
  font-size: 1.5rem;
  background-color: hsla(0, 50%, 50%, 0.3);
  border: none;
  outline: none;

  border-bottom: 1px crimson solid;

  &:hover, &:focus {
    background-color: hsla(0, 50%, 50%, 0.5);
  }
`

interface TextInputProps {
  onInput?: (value: string) => void;
  onKeyDown?: (key: string) => void;
}

export const TextInput = ({onInput, onKeyDown}: TextInputProps) => {
  const handleKeystroke = ({ key }: KeyboardEvent) => onKeyDown?.(key)
  const handleInput = ({
    currentTarget
  }: { currentTarget: HTMLInputElement }
  ) => onInput?.(currentTarget.value)

  return (
    <Input
      onKeyDown={handleKeystroke}
      onInput={handleInput}
    />
  );
};
