/* @refresh reload */
import { render } from "solid-js/web"

import "wicg-inert"
import { App } from "./App"

render(() => <App />, document.getElementById("root")!)
