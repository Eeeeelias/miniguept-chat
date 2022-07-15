import Color from "color"

export const hslFromString = (color: string) =>
  Color(color).hsl().array() as [number, number, number]
