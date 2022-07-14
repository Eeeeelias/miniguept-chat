import { normalize } from "./helpers"
import { clamp } from "../../clamp"

export const shadowColor = (
  backgroundHsl: [number, number, number],
  oomph: number,
  tintShadows = true
): [number, number, number] => {
  if (!tintShadows) {
    return [0, 0, 0]
  }

  const [hue, ...rest] = backgroundHsl
  let [sat, lit] = rest

  const maxLightness = normalize(oomph, 0, 1, 85, 50)

  const saturationEnhancement = normalize(lit, 50, 100, 1, 0.25)

  sat = clamp(sat * saturationEnhancement, 0, 100)

  lit = normalize(lit, 0, 100, 0, maxLightness) - 5
  lit = clamp(lit, 0, 100)

  return [hue, Math.round(sat), Math.round(lit)]
}
