import { normalize, roundTo } from "./helpers"
import { CrispyArg } from "./types"

interface CalculateBlurRadiusArgs extends CrispyArg {
  x: number
  y: number
}

export const shadowBlur = ({ x, y, crispy }: CalculateBlurRadiusArgs) => {
  // The blur radius should depend on the x/y offset.
  // Calculate the hypothenuse length and use it as the blur radius
  const hypothenuse = (x ** 2 + y ** 2) ** 0.5

  const radius = normalize(crispy, 0, 1, hypothenuse * 1.5, hypothenuse * 0.75)

  return roundTo(radius, 1)
}
