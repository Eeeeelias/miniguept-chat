import { onCleanup, onMount } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../../theme"
import { opositePosition } from "./opositePosition"
import { TooltipProps } from "./Tooltip"

const Content = styled.div<TooltipProps>`
  ${opositePosition}: calc(100% + 1rem);
  position: absolute;
  padding: ${tokens.space.small};
  background-color: ${args => args.theme?.().bg.input};
  border-radius: ${tokens.borderRadius};
`

export const Popover = (props: TooltipProps) => {
  let innerRef: HTMLDivElement
  let preventInitialClose = true

  const close = (e: MouseEvent | FocusEvent) => {
    console.log(e.target)
    if (!preventInitialClose)
      !innerRef.contains(e.target as Node) && props.onClose()
    preventInitialClose = false
  }

  onMount(() => {
    window.addEventListener("click", close)
    window.addEventListener("focusin", close)
  })
  onCleanup(() => {
    window.removeEventListener("click", close)
    window.removeEventListener("focusin", close)
  })

  return (
    <Content ref={r => (innerRef = r)} {...props}>
      {<props.Content />}
    </Content>
  )
}