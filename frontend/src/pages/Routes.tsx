import { For, lazy } from "solid-js"

import { Routes as SolidRoutes, Route } from "solid-app-router"

const Chat = lazy(() => import("./chat"))
const Help = lazy(() => import("./help"))
const About = lazy(() => import("./about"))

export const routes = [
  {
    path: "/",
    label: "Chat",
    component: Chat,
  },
  {
    path: "/help",
    label: "Help",
    component: Help,
  },
  {
    path: "/about",
    label: "About",
    component: About,
  },
]

export const Routes = () => (
  <SolidRoutes>
    <For each={routes}>{route => <Route {...route} />}</For>
  </SolidRoutes>
)
