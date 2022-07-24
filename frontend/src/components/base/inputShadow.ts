import { tokens } from "../../theme"
import { ThemeProp } from "../types"

export const inputShadow = (args: ThemeProp) => `
  box-shadow: ${tokens.shadow.low(args.theme?.().bg.surface)};
`
