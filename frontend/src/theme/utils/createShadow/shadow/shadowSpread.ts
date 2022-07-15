import { normalize, roundTo } from "./helpers"
import { CrispyArg, LayerArgs } from "./types"

export const shadowSpread = ({
  crispy,
  layerIndex,
  numOfLayers,
}: CrispyArg & LayerArgs) => {
  if (layerIndex === 0) {
    return 0
  }

  const maxReduction = normalize(crispy, 0, 1, 0, -5)
  const actualReduction = normalize(
    layerIndex + 1,
    1,
    numOfLayers,
    0,
    maxReduction
  )

  return roundTo(actualReduction, 1)
}
