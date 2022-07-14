import { createGlobalStyles } from "solid-styled-components"

export const GlobalStyles = createGlobalStyles`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  body {
    font-family: "Quicksand", sans-serif;
    font-weight: 400;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`
