import { clamp } from "../../clamp"
import { normalize, roundTo } from "./helpers"
import { CrispyArg, LayerArgs, OomphArg } from "./types"

interface ShadowOpacityArgs extends OomphArg, CrispyArg, LayerArgs {
  tintShadows: boolean
  minLayers: number
  maxLayers: number
}

export const shadowOpacity = ({
  oomph,
  crispy,
  tintShadows,
  layerIndex,
  numOfLayers,
  minLayers,
  maxLayers,
}: ShadowOpacityArgs) => {
  const baseOpacity = normalize(oomph, 0, 1, 0.4, 1.25)

  const initialOpacityMultiplier = normalize(crispy, 0, 1, 0, 1)
  const finalOpacityMultiplier = normalize(crispy, 0, 1, 1, 0)

  const layerOpacityMultiplier = normalize(
    layerIndex,
    0,
    numOfLayers,
    initialOpacityMultiplier,
    finalOpacityMultiplier
  )

  const opacity = baseOpacity * layerOpacityMultiplier

  const averageLayers = (minLayers + maxLayers) / 2
  const ratio = averageLayers / numOfLayers

  let layerOpacity = opacity * ratio

  if (!tintShadows) layerOpacity *= 0.3

  return clamp(roundTo(layerOpacity, 2), 0, 1)
}
