import { ParentProps, createMemo, createUniqueId, createEffect } from "solid-js"

import { ChevronLeft, Icon, Spacing, Text } from "../../primitives"
import { createToggle } from "../../utils"
import { createCallback } from "../../utils/createCallback"
import { Panel } from "./Panel"
import { AccordionButton } from "./TitleButton"

interface CollapsibleProps extends ParentProps {
  title: string
}
export const Collapsible = (props: CollapsibleProps) => {
  let control: HTMLButtonElement
  let panel: HTMLDivElement
  const id = createUniqueId()
  const [open, toggle] = createToggle()

  const handleToggle = createCallback(() => {
    toggle()
    if (control) control.focus()
  })

  const controlArgs = createMemo(() => ({
    "aria-controls": id,
    "aria-expanded": open(),
  }))
  const contentArgs = createMemo(() => ({
    id,
    "aria-hidden": !open(),
    inert: !open(),
  }))

  createEffect(() => {
    const height = panel && open() ? panel.scrollHeight : 0
    panel.style.height = `${height}px`
  })

  return (
    <div>
      <AccordionButton
        ref={r => (control = r)}
        open={open()}
        onClick={handleToggle()}
        {...controlArgs}
      >
        <Text.Medium noWrap maxWidth="100%">
          {props.title}
        </Text.Medium>
        <Icon icon={ChevronLeft} size="large" />
      </AccordionButton>
      <Panel ref={r => (panel = r)} {...contentArgs}>
        <Spacing each="medium">{props.children}</Spacing>
      </Panel>
    </div>
  )
}
