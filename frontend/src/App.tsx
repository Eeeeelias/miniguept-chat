import { Router } from "solid-app-router"
import { styled } from "solid-styled-components"

import Waves from "./assets/waves.svg"
import { Header } from "./components/layout"
import { getTextStyles } from "./components/primitives/Text"
import { Routes } from "./pages/Routes"
import { ThemeProvider, tokens } from "./theme"

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

const Container = styled.div`
  position: absolute;
  height: 20%;
  bottom: 0;
  left: 0;
  right: 0;
`

const Image = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`

export const App = () => (
  <ThemeProvider>
    <Wrapper>
      <Router>
        <Layout>
          <Header />
          <Routes />
        </Layout>
      </Router>
      <Container>
        <Image src={Waves} />
      </Container>
    </Wrapper>
  </ThemeProvider>
)
