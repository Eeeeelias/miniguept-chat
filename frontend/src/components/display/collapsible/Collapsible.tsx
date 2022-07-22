import { ParentProps, createMemo, createUniqueId, createEffect } from "solid-js"

import { ChevronLeft, Icon, Spacing, Text } from "../../primitives"
import { createToggle } from "../../utils"
import { Panel } from "./Panel"
import { AccordionButton } from "./TitleButton"

interface CollapsibleProps extends ParentProps {
  title: string
}
export const Collapsible = (props: CollapsibleProps) => {
  let panel: HTMLDivElement
  const id = createUniqueId()
  const [open, toggle] = createToggle()

  const titleArgs = createMemo(() => ({
    "aria-controls": id,
  }))
  const contentArgs = createMemo(() => ({
    id,
    "aria-expanded": open(),
    "aria-hidden": !open(),
  }))

  createEffect(() => {
    const height = panel && open() ? panel.scrollHeight : 0
    panel.style.height = `${height}px`
  })

  return (
    <div>
      <AccordionButton open={open()} onClick={toggle} {...titleArgs}>
        <Text.Medium noWrap maxWidth="100%">
          {props.title}
        </Text.Medium>
        <Icon icon={ChevronLeft} size="large" />
      </AccordionButton>
      <Panel ref={r => (panel = r)} inert={!open()} {...contentArgs}>
        <Spacing each="medium">{props.children}</Spacing>
      </Panel>
    </div>
  )
}
