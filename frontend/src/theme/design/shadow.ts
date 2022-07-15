import { createShadow, GetShadowOptions } from "../utils/createShadow"

type ShadowGetter = (color: string, options?: GetShadowOptions) => string

export interface Shadows {
  low: ShadowGetter
  medium: ShadowGetter
  high: ShadowGetter
}

export const shadow: Shadows = {
  low: (color, options) => createShadow("low", color, options),
  medium: (color, options) => createShadow("medium", color, options),
  high: (color, options) => createShadow("high", color, options),
}
