import { hslFromString } from "./hslFromString"
import { clamp } from "./clamp"

export const hsla = (color: string, opacity: number) => {
  const [h, s, l] = hslFromString(color)
  const a = clamp(opacity, 0, 1)
  return `hsla(${h}, ${s}, ${l}, ${a})`
}
