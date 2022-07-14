export const formatHslString = (
  [h, s, l]: [number, number, number],
  opacity?: number
) => {
  const values = `${h}deg ${s}% ${l}%`
  const opacityString = opacity ? ` / ${opacity}` : ""
  return `hsl(${values}${opacityString})`
}

interface Offset {
  x: number
  y: number
}

interface ShadowProperties {
  hsl: [number, number, number]
  offset: Offset
  blur: number
  spread?: number
  opacity: number
}

export const shadowToString = ({
  hsl,
  offset: { x, y },
  blur,
  spread,
  opacity,
}: ShadowProperties) => {
  const parameters = [x, y, blur]
  if (spread) parameters.push(spread)
  const measures = parameters.map(val => `${val}px`).join(" ")
  const color = formatHslString(hsl, opacity)
  return `${measures} ${color}`
}
