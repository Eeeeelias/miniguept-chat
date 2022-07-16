import { createMemo } from "solid-js"

import { keyframes, styled } from "solid-styled-components"

import { useThemeMode } from "../../theme"
import { VisuallyHidden } from "../base"
import { Icon } from "../primitives"
import { Moon, Sun } from "../primitives/icons"
import { IconButton } from "./IconButton"

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

const getAnimation = ({ active }: { active: boolean }) => {
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
  position: absolute;
  bottom: -0.5rem;
  display: flex;
  justify-content: space-between;
  width: 3rem;
  ${getAnimation}
`

export const ThemeToggle = () => {
  const [mode, toggle] = useThemeMode()
  const isDark = createMemo(() => mode() === "dark")

  return (
    <IconButton.styled
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
    </IconButton.styled>
  )
}
