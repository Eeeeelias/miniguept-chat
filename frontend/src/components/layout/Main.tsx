import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { surfaceStyles } from "./surfaceStyles"

const Surface = styled.main`
  ${surfaceStyles}
  padding: ${tokens.space.large};
  width: 100%;
  height: calc(100% - 4rem);
  min-height: calc(100% - 4rem);

  display: flex;
  flex-direction: column;
  gap: ${tokens.space.large};
`

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.medium};
  overflow-y: auto;
  margin: -0.5rem;
  padding: 0.5rem;
  margin-right: -1.5rem;
  padding-right: 1.5rem;
`

export const Main = Object.assign(Surface, { ScrollArea })
