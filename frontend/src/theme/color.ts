import { hsla } from "./utils/hsla"

// Nord colors: https://www.nordtheme.com/

const nord_darkest = "#242933"
const nord0 = "#2e3440"
const nord1 = "#3b4252"
const nord2 = "#434c5e"
const nord3 = "#4c566a"

const nord4 = "#d8dee9"
const nord5 = "#e5e9f0"
const nord6 = "#eceff4"
const nord_bright = "#f2f4f8"
const nord_brightest = "#ffffff"

const nord7 = "#8fbcbb"
const nord8 = "#88c0d0"
const nord9 = "#81a1c1"
const nord10 = "#5e81ac"

const nord11 = "#bf616a"
const nord12 = "#d08770"
const nord13 = "#ebcb8b"
const nord14 = "#a3be8c"
const nord15 = "#b48ead"

export type ThemeName = "light" | "dark"

export interface Colors {
  name: ThemeName
  bg: {
    base: string
    surface: string
    input: string
    highlight: string
    colored: string
  }
  fg: {
    base: string
    muted: string
  }
  accent: {
    base: string
    alt: string
    special: string
  }
  alert: {
    error: string
    danger: string
    warning: string
    success: string
  }
}

const alert: Colors["alert"] = {
  error: nord11,
  danger: nord12,
  warning: nord13,
  success: nord14,
}

const accent: Colors["accent"] = {
  base: nord8,
  alt: nord7,
  special: nord15,
}

export const dark: Colors = {
  name: "dark",
  bg: {
    base: nord_darkest,
    surface: nord0,
    input: nord1,
    highlight: nord2,
    colored: nord10,
  },
  fg: {
    base: nord6,
    muted: hsla(nord4, 0.5),
  },
  accent,
  alert,
}

export const light: Colors = {
  name: "light",
  bg: {
    base: nord_bright,
    surface: nord_brightest,
    input: nord5,
    highlight: nord4,
    colored: nord9,
  },
  fg: {
    base: nord1,
    muted: hsla(nord3, 0.5),
  },
  accent,
  alert,
}
