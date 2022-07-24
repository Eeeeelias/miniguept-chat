import { createGlobalStyles } from "solid-styled-components"

export const GlobalStyles = createGlobalStyles`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0 , 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0 , 0.5);
  }

  html {
    overflow: hidden;
  }

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
    outline: none;
    color: inherit;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    background-color: transparent;
    border: none;
    outline: none;
  }
  
  a {
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
    padding: 0;
  }

  h1, h2, h3, h4 {
    margin: 0;
    padding: 0;
  }
`
