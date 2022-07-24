import { Show } from "solid-js"

import { Router } from "solid-app-router"
import { styled } from "solid-styled-components"

import blobLeftDark from "./assets/blob-left-dark.svg"
import blobLeftLight from "./assets/blob-left-light.svg"
import blobRightDark from "./assets/blob-right-dark.svg"
import blobRightLight from "./assets/blob-right-light.svg"
import { Header, getTextStyles } from "./components"
import { Routes } from "./pages/Routes"
import { ThemeProvider, tokens, useThemeMode } from "./theme"

const Wrapper = styled.div`
  ${getTextStyles}
  position: relative;
  height: 100%;
  width: 100%;
  padding: ${tokens.space.largest};
  padding-top: ${tokens.space.medium};
  background-color: ${args => args.theme?.().bg.base};
  color: ${args => args.theme?.().fg.base};
  overflow: hidden;
`

const Layout = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  max-height: 100%;
  height: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: ${tokens.space.medium};
`

const ImageRight = styled.img`
  position: fixed;
  height: 40%;
  right: 0;
  top: 0;
`
const ImageLeft = styled.img`
  position: fixed;
  height: 40%;
  bottom: 0;
  left: 0;
`

const Blobs = () => {
  const [mode] = useThemeMode()
  return (
    <>
      <Show when={mode() === "light"}>
        <ImageLeft src={blobLeftLight} alt="" />
        <ImageRight src={blobRightLight} alt="" />
      </Show>
      <Show when={mode() === "dark"}>
        <ImageLeft src={blobLeftDark} alt="" />
        <ImageRight src={blobRightDark} alt="" />
      </Show>
    </>
  )
}

export const App = () => (
  <ThemeProvider>
    <Wrapper>
      <Router>
        <Layout>
          <Header />
          <Routes />
        </Layout>
      </Router>
      <Blobs />
    </Wrapper>
  </ThemeProvider>
)
