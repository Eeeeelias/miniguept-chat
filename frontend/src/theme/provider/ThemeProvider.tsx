import {
  Accessor,
  createContext,
  createEffect,
  ParentProps,
  useContext,
  createSignal,
} from "solid-js"

import { ThemeProvider as StyledTheme } from "solid-styled-components"

import { Theme } from "../../@types/styled.d"
import { createStorageSignal } from "../../components"
import { dark, light, ThemeName } from "../design"
import { GlobalStyles } from "./GlobalStyles"

type ThemeModeState = readonly [Accessor<ThemeName>, () => void]

const ModeContext = createContext<ThemeModeState>([() => "dark", () => null])
export const useThemeMode = () => useContext(ModeContext)

const getTheme = (mode: ThemeName): Theme => (mode === "light" ? light : dark)

export const ThemeProvider = (props: ParentProps) => {
  const [mode, setMode] = createStorageSignal<ThemeName>("theme-mode", "dark", {
    sync: true,
  })
  const [theme, setTheme] = createSignal<Theme>(getTheme("dark"))

  const store = [
    mode,
    () => setMode(mode => (mode === "light" ? "dark" : "light")),
  ] as const

  createEffect(() => {
    setTheme(getTheme(mode()))
  })

  return (
    <ModeContext.Provider value={store}>
      <StyledTheme theme={theme}>
        <GlobalStyles />
        {props.children}
      </StyledTheme>
    </ModeContext.Provider>
  )
}
