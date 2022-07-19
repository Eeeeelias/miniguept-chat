export const createId = () =>
  Math.random().toString(36).slice(-7, -1) +
  Date.now().toString(36).slice(-5, -1)
