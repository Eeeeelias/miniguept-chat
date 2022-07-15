import { ShadowFactory } from "./shadow"
import { ShadowType } from "./shadow/ShadowFactory"
import { Size } from "./shadow/types"

const Factory = {
  diagonal: new ShadowFactory({ lightSource: { x: -0.5, y: -0.5 } }),
  vertical: new ShadowFactory({ lightSource: { x: 0, y: -0.5 } }),
}

export interface GetShadowOptions {
  direction?: "vertical" | "diagonal"
  usage?: ShadowType
}

export const createShadow = (
  size: Size,
  color: string,
  options?: GetShadowOptions
) => {
  const factory = Factory[options?.direction || "diagonal"]
  return size === "low"
    ? factory.getSmall(color, options?.usage)
    : size === "medium"
    ? factory.getMedium(color, options?.usage)
    : factory.getLarge(color, options?.usage)
}
