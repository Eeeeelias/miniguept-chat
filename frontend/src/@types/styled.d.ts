import { Accessor } from 'solid-js';
import 'solid-styled-components';
import { Colors } from '../theme/color'
import { Shadows } from '../theme/shadow'
import { Spacing } from '../theme/space'


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

declare module 'solid-styled-components' {
  export interface DefaultTheme extends Accessor<Theme> {
  }
}
