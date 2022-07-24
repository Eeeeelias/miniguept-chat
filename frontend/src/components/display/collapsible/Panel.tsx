import { styled } from "solid-styled-components"

import { Inert } from "../../base"

export const Panel = styled(Inert)`
  height: 0;
  overflow: hidden;
  transition: height 0.1s ease-out;
`
