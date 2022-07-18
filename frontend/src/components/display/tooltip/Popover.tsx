import { onCleanup, onMount } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../../theme"
import { opositePosition } from "./opositePosition"
import { TooltipProps } from "./Tooltip"

const Content = styled.div<TooltipProps>`
  ${opositePosition}: calc(100% + 0.9rem);
  position: absolute;
  padding: ${tokens.space.small};
  background-color: ${args => args.theme?.().bg.input};
  border-radius: ${tokens.borderRadius};
`

export const Popover = (props: TooltipProps) => {
  let innerRef: HTMLDivElement
  let preventInitialClose = true

  const close = (e: MouseEvent | FocusEvent) => {
    if (!preventInitialClose)
      !innerRef.contains(e.target as Node) && props.onClose?.()
    else preventInitialClose = false
  }

  onMount(() => {
    window.addEventListener("click", close)
  })
  onCleanup(() => {
    window.removeEventListener("click", close)
  })

  return (
    <Content ref={r => (innerRef = r)} {...props}>
      {<props.Content />}
    </Content>
  )
}
