import { createMemo } from "solid-js"

import { keyframes, styled } from "solid-styled-components"

import { useThemeMode } from "../../theme"
import { VisuallyHidden } from "../base"
import { Icon } from "../primitives"
import { Moon, Sun } from "../primitives/icons"

const animateIn = keyframes`
  from {
    transform: rotate(-90deg);
  } to {
    transform: rotate(90deg);
  }
`

const animateOut = keyframes`
  from {
    transform: rotate(90deg);
  } to {
    transform: rotate(270deg);
  }
`

const Button = styled.button`
  ${args => `
    position: relative;
    width: 2rem;
    height: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    background-color: ${args.theme?.().color.bg.base};
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 0.5rem;

    &:focus-visible {
      outline: 2px solid ${args.theme?.().color.accent.base};
    }
  `}
`

const getAnimation = (active: boolean) => {
  const outer = active ? animateIn : animateOut
  const inner = active ? animateOut : animateIn
  return `
    animation: 1s ${outer} forwards;
    svg {
      animation: 1s ${inner} forwards;
    }
  `
}

const Axis = styled.span<{ active: boolean }>`
  ${args => `
    position: absolute;
    bottom: -10px;
    display: flex;
    justify-content: space-between;
    width: 50px;
    ${getAnimation(args.active)}
  `}
`

export const ThemeToggle = () => {
  const [mode, toggle] = useThemeMode()
  const isDark = createMemo(() => mode() === "dark")

  return (
    <Button
      role="switch"
      aria-checked={!isDark()}
      onClick={toggle}
      title="Toggle light and dark mode"
    >
      <Axis active={isDark()}>
        <Icon icon={Moon} />
      </Axis>
      <Axis active={!isDark()}>
        <Icon icon={Sun} />
      </Axis>
      <VisuallyHidden>
        Toggle to {isDark() ? "light" : "dark"} colors
      </VisuallyHidden>
    </Button>
  )
}
