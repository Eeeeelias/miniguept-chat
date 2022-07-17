import {
  ParentProps,
  Show,
  Component,
  createEffect,
  createSignal,
} from "solid-js"

import { Portal } from "solid-js/web"
import { styled } from "solid-styled-components"

import { tokens } from "../../../theme"
import { opositePosition } from "./opositePosition"
import { Popover } from "./Popover"

const horizontalCaretStyles = `
  width: 1rem;
  height: 0.5rem;
`
const verticalCaretStyles = `
  height: 1rem;
  width: 0.5rem;
`

const getCaretPosition = ({ position = "top" }: TooltipProps) =>
  position === "top"
    ? `
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      ${horizontalCaretStyles}
    `
    : position === "bottom"
    ? `
      clip-path: polygon(0 100%, 50% 0, 100% 100%);
      ${horizontalCaretStyles}
    `
    : position === "left"
    ? `
      clip-path: polygon(0 0, 100% 50%, 0 100%);
      ${verticalCaretStyles}
    `
    : `
      clip-path: polygon(100% 0, 100% 100%, 0 50%);
      ${verticalCaretStyles}
    `

const Caret = styled.div<TooltipProps>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: ${args =>
    tokens.shadow.medium(args.theme?.().bg.base, { usage: "drop-shadow" })};

  &::before {
    content: "";
    ${opositePosition}: calc(100% + 0.5rem);
    position: absolute;
    background-color: ${args => args.theme?.().bg.input};
    ${getCaretPosition}
  }
`

const Position = styled.div`
  position: relative;
`

interface Boundaries {
  x: number
  y: number
  width: number
  height: number
}

export interface TooltipProps extends ParentProps {
  Content: Component
  open: boolean
  onClose: () => void
  position?: "top" | "bottom" | "left" | "right"
  // align?: "start" | "center" | "end"
}

const getBoundaryStyles = ({ height, width, x, y }: Boundaries) => `
  top: ${y}px;
  left: ${x}px;
  width: ${width}px;
  height: ${height}px;
`

export const Tooltip = (props: TooltipProps) => {
  let outerRef: HTMLDivElement
  const [resizer, setResizer] = createSignal<ResizeObserver | null>(null)
  const [boundaries, setBoundaries] = createSignal({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const updateBoundaries = () => setBoundaries(outerRef.getBoundingClientRect())

  createEffect(() => {
    if (props.open) {
      const resizer = new ResizeObserver(updateBoundaries)
      resizer.observe(document.body)
      setResizer(resizer)
    } else {
      resizer()?.disconnect()
    }
  })

  return (
    <Position ref={r => (outerRef = r)}>
      <Show when={props.open}>
        <Portal>
          <Caret style={getBoundaryStyles(boundaries())} {...props}>
            <Popover {...props} />
          </Caret>
        </Portal>
      </Show>
      {props.children}
    </Position>
  )
}
