import { createEffect, JSX, splitProps, on } from "solid-js"

export const applyInert = (element: HTMLElement, inert?: boolean) => {
  // @ts-ignore
  if (inert) element.inert = true
  else element.attributes.removeNamedItem("inert")
  console.log("applyInert", element, inert)
}

interface InertProps extends JSX.HTMLAttributes<HTMLDivElement> {
  inert?: boolean
}
export const Inert = (props: InertProps) => {
  /** Reason:
   * Omit the inert attribute from props.
   * But it is not reactive, therefore it cannot be used in the effect.
   */
  // eslint-disable-next-line no-unused-vars
  const [_, rest] = splitProps(props, ["inert"])
  let ref: HTMLDivElement

  createEffect(
    on(
      () => props.inert,
      () => applyInert(ref, props.inert)
    )
  )

  return (
    <div
      ref={r => {
        ref = r
        props.ref = r
      }}
      {...rest}
    />
  )
}
