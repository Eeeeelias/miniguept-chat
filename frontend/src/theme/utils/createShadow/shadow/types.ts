export type Size = "low" | "medium" | "high"

export interface OomphArg {
  oomph: number
}
export interface CrispyArg {
  crispy: number
}
export interface LightSourceArg {
  lightSource: {
    x: number
    y: number
  }
}

export interface LayerBoundaries {
  minLayers: number
  maxLayers: number
}
export interface LayerArgs extends LayerBoundaries {
  layerIndex: number
  numOfLayers: number
}
