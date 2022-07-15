import { Accessor } from "solid-js"

import "solid-styled-components"
import { Shadows, Spacing } from "../theme/design"
import { Colors } from "../theme/design/color"

/**
 declare module 'solid-styled-components' {
   export interface DefaultTheme {
     color: Colors
     space: Spacing
     shadow: Shadows
   }
 }
*/

export interface Theme {
  color: Colors
  space: Spacing
  shadow: Shadows
}

declare module "solid-styled-components" {
  export interface DefaultTheme extends Accessor<Theme> {}
}
