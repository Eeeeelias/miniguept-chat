import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { surfaceStyles } from "./surfaceStyles"

export const Sidebar = styled.aside`
  ${surfaceStyles}
  height: 100%;
  width: 5.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${tokens.space.medium};
  padding: ${tokens.space.small} 0;
`
