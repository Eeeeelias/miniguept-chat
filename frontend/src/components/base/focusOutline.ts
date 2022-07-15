import { ThemeProp } from "./ThemeProp"

export const focusOutline = (args: ThemeProp) => `
  outline: 2px solid ${args.theme?.().accent.base};
`
