import { hslFromString } from "../../hslFromString"
import { createShadowBySize } from "./getShadows"
import { shadowColor } from "./shadowColor"
import { shadowToString } from "./shadowToString"
import { CrispyArg, LightSourceArg, OomphArg, Size } from "./types"

export type ShadowType = "drop-shadow" | "box-shadow" | "text-shadow"

const asBoxOrTextShadow = (acc: string, shadow: string) =>
  !acc ? shadow : `${acc}, ${shadow}`
const asDropShadow = (acc: string, shadow: string) =>
  `${acc} drop-shadow(${shadow})`

const joinShadows = (shadows: string[], type: ShadowType) =>
  type === "box-shadow" || type === "text-shadow"
    ? shadows.reduce(asBoxOrTextShadow, "").trim()
    : shadows.reduce(asDropShadow, "").trim()

export interface ShadowLayer {
  blur: number
  spread: number
  opacity: number
  offset: {
    x: number
    y: number
  }
}

interface ShadowOptions extends LightSourceArg, CrispyArg, OomphArg {
  resolution: number
  tintShadows: boolean
}

const finalizeLayers = (
  hsl: [number, number, number],
  layers: ShadowLayer[],
  type: ShadowType
) =>
  layers.map(({ spread, ...layer }) =>
    type === "box-shadow"
      ? shadowToString({ hsl, spread, ...layer })
      : shadowToString({ hsl, ...layer })
  )

export class ShadowFactory {
  private createShadowSize: (size: Size) => ShadowLayer[]
  private options: ShadowOptions

  private low: ShadowLayer[] | null = null
  private medium: ShadowLayer[] | null = null
  private high: ShadowLayer[] | null = null

  constructor({
    lightSource = { x: -0.5, y: -0.5 },
    crispy = 0.5,
    oomph = 0.5,
    resolution = 0.75,
    tintShadows = true,
  }: Partial<ShadowOptions>) {
    this.options = { lightSource, crispy, oomph, resolution, tintShadows }
    this.createShadowSize = (size: Size) =>
      createShadowBySize(size, {
        crispy,
        lightSource,
        oomph,
        resolution,
        tintShadows,
      })
  }

  private getShadowColor(color: string) {
    const hsl = hslFromString(color)
    if (!hsl) throw new Error(`Invalid color: ${color}`)
    const { oomph, tintShadows } = this.options
    return shadowColor(hsl, oomph, tintShadows)
  }

  private getShadow(
    size: Size,
    color: string,
    type: ShadowType = "box-shadow"
  ) {
    if (!this[size]) this[size] = this.createShadowSize(size)
    const shadowHsl = this.getShadowColor(color)
    const layers = this[size] as ShadowLayer[]
    const shadows = finalizeLayers(shadowHsl, layers, type)
    return joinShadows(shadows, type)
  }

  public getSmall(color: string, type?: ShadowType) {
    return this.getShadow("low", color, type)
  }

  public getMedium(color: string, type?: ShadowType) {
    return this.getShadow("medium", color, type)
  }

  public getLarge(color: string, type?: ShadowType) {
    return this.getShadow("high", color, type)
  }
}
