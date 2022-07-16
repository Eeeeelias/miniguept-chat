import { ThemeProp } from "../types/ThemeProp"

export const focusOutline = (args: ThemeProp) => `
  outline: 2px solid ${args.theme?.().accent.base};
`
