import { createSignal } from "solid-js"

export const createToggle = (initial?: boolean) => {
  const [value, setValue] = createSignal(!!initial)
  const toggle = () => setValue(value => !value)
  return [value, toggle]
}
