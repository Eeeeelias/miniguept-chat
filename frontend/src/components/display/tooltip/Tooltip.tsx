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
  z-index: 999;
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

export interface TooltipProps extends ParentProps {
  Content: Component
  open: boolean
  onClose?: () => void
  position?: "top" | "bottom" | "left" | "right"
  // align?: "start" | "center" | "end"
}

const getBoundaryStyles = (
  boundaries: DOMRect | null,
  position?: TooltipProps["position"]
) => {
  if (!boundaries) return ""
  const { height, width, top, right, bottom, left } = boundaries
  switch (position) {
    case "left":
      return `
        top: ${top + height / 2}px;
        left: ${left}px;
      `
    case "right":
      return `
        top: ${top + height / 2}px;
        left: ${right}px;
      `
    case "bottom":
      return `
        top: ${bottom}px;
        left: ${left + width / 2}px;
        `
    case "top":
    default:
      return `
            top: ${top}px;
            left: ${left + width / 2}px;
          `
  }
}

export const Tooltip = (props: TooltipProps) => {
  let outerRef: HTMLDivElement
  const [resizer, setResizer] = createSignal<ResizeObserver | null>(null)
  const [boundaries, setBoundaries] = createSignal<DOMRect | null>(null)

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
          <Caret
            style={getBoundaryStyles(boundaries(), props.position)}
            {...props}
          >
            <Popover {...props} />
          </Caret>
        </Portal>
      </Show>
      {props.children}
    </Position>
  )
}
