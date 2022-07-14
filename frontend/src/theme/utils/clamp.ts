export const clamp = (val: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, val))
