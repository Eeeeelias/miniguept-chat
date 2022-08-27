import { Show, createEffect, ParentProps } from "solid-js"

import { Portal } from "solid-js/web"
import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { hsla } from "../../theme/utils/hsla"
import { surfaceStyles } from "./surfaceStyles"

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${args => hsla(args.theme?.().bg.base || "black", 0.5)};
  padding: ${tokens.space.medium};

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

const Surface = styled.div`
  height: max-content;
  width: 100%;
  max-width: 700px;
  max-height: min(700px, 100%);
  padding: ${tokens.space.large};
  border-radius: ${tokens.borderRadius};
  ${surfaceStyles}
  box-shadow: ${args => tokens.shadow.high(args.theme?.().bg.base)};
  overflow-y: scroll;
`

interface ModalProps extends ParentProps {
  open: boolean
}

export const Modal = (props: ModalProps) => {
  const root = document.getElementById("root")
  createEffect(() => {
    if (props.open) {
      root?.style.setProperty("filter", "blur(1px)")
      root?.setAttribute("inert", "true")
      root?.setAttribute("aria-hidden", "true")
    } else {
      root?.style.removeProperty("filter")
      root?.removeAttribute("inert")
      root?.removeAttribute("aria-hidden")
    }
  })

  return (
    <Show when={props.open}>
      <Portal>
        <Backdrop>
          <Surface>{props.children}</Surface>
        </Backdrop>
      </Portal>
    </Show>
  )
}
