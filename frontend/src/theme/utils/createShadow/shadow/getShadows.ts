import { range, normalize } from "./helpers"
import { shadowBlur } from "./shadowBlur"
import { ShadowLayer } from "./ShadowFactory"
import { shadowOffsets } from "./shadowOffsets"
import { shadowOpacity } from "./shadowOpacity"
import { shadowSpread } from "./shadowSpread"
import {
  CrispyArg,
  LayerArgs,
  OomphArg,
  LayerBoundaries,
  LightSourceArg,
  Size,
} from "./types"

interface GenerateShadowsArgs extends OomphArg, CrispyArg, LightSourceArg {
  resolution: number
  tintShadows: boolean
}

interface Range {
  min: number
  max: number
}
const SHADOW_LAYER_LIMITS: Record<Size, Range> = {
  low: {
    min: 2,
    max: 3,
  },
  medium: {
    min: 2,
    max: 5,
  },
  high: {
    min: 3,
    max: 10,
  },
}

const getAmountOfLayers = ({
  resolution,
  minLayers,
  maxLayers,
}: GenerateShadowsArgs & LayerBoundaries) =>
  Math.round(normalize(resolution, 0, 1, minLayers, maxLayers))

const createShadow = (
  size: Size,
  args: GenerateShadowsArgs & LayerArgs
): ShadowLayer => {
  const offset = shadowOffsets({
    ...args,
    size,
  })

  return {
    offset,
    blur: shadowBlur({ ...args, ...offset }),
    spread: shadowSpread(args),
    opacity: shadowOpacity(args),
  }
}

export const createShadowBySize = (size: Size, args: GenerateShadowsArgs) => {
  const minLayers = SHADOW_LAYER_LIMITS[size].min
  const maxLayers = SHADOW_LAYER_LIMITS[size].max

  const numOfLayers = getAmountOfLayers({ ...args, minLayers, maxLayers })
  const layerArgs = { numOfLayers, minLayers, maxLayers }

  return range(numOfLayers).map(layerIndex =>
    createShadow(size, { ...args, ...layerArgs, layerIndex })
  )
}
