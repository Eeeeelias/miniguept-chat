import { normalize, roundTo, getValuesForBezierCurve } from "./helpers"
import { CrispyArg, LayerArgs, OomphArg, LightSourceArg, Size } from "./types"

interface ShadowOffsetsArgs
  extends OomphArg,
    CrispyArg,
    LightSourceArg,
    LayerArgs {
  size: Size
}

export const shadowOffsets = ({
  size,
  oomph,
  crispy,
  layerIndex,
  lightSource,
  numOfLayers,
}: ShadowOffsetsArgs) => {
  const maxOffsetBySize = {
    low: normalize(oomph, 0, 1, 3, 5),
    medium: normalize(oomph, 0, 1, 15, 25),
    high: normalize(oomph, 0, 1, 50, 150),
  }

  const [ratio] = getValuesForBezierCurve(
    {
      startPoint: [0, 1],
      endPoint: [1, 0],
      controlPoint1: [
        normalize(crispy, 0, 1, 0.25, 0),
        normalize(crispy, 0, 1, 0.25, 0),
      ],
      controlPoint2: [
        normalize(crispy, 0, 1, 0.25, 0),
        normalize(crispy, 0, 1, 0.25, 0),
      ],
    },
    layerIndex / (numOfLayers - 1)
  )

  const max = maxOffsetBySize[size]

  const xOffsetMin = normalize(lightSource.x, -1, 1, 1, -1)
  const xOffsetMax = normalize(lightSource.x, -1, 1, max, max * -1)
  const yOffsetMin = normalize(lightSource.y, -1, 1, 1, -1)
  const yOffsetMax = normalize(lightSource.y, -1, 1, max, max * -1)

  const x = roundTo(normalize(ratio, 0, 1, xOffsetMin, xOffsetMax), 1)
  const y = roundTo(normalize(ratio, 0, 1, yOffsetMin, yOffsetMax), 1)

  return { x, y }
}
