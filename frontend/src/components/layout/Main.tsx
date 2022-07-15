import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { surfaceStyles } from "./surfaceStyles"

export const Main = styled.main`
  ${surfaceStyles}
  padding: ${tokens.space.large};
  height: 100%;
  width: 100%;
`
