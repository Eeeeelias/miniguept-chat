import { tokens } from "../../theme"
import { ThemeProp } from "../base/ThemeProp"

export const surfaceStyles = (args: ThemeProp) => `
  border-radius: ${tokens.borderRadius};
  background-color: ${args.theme?.().bg.surface};
  box-shadow: ${tokens.shadow.medium(args.theme?.().bg.base)};
`
