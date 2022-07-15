import { Accessor } from "solid-js"

import "solid-styled-components"
import { Colors } from "../theme/design/color"

export interface Theme extends Colors {}

declare module "solid-styled-components" {
  export interface DefaultTheme extends Accessor<Theme> {}
}
