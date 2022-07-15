import { Router } from "solid-app-router"
import { styled } from "solid-styled-components"

import { Header } from "./components/layout"
import { Spacing } from "./components/primitives/Spacing"
import { Routes } from "./pages/Routes"
import { ThemeProvider } from "./theme"

const Wrapper = styled.div`
  ${args => `
		height: 100%;
		width: 100%;
		padding: ${args.theme?.().space.largest};
		padding-top: ${args.theme?.().space.medium};
		background-color: ${args.theme?.().color.bg.base};
		color: ${args.theme?.().color.fg.base};
	`}
`

const Layout = styled.div`
  ${args => `
		max-width: 1000px;
		max-height: 100%;
		margin: 0 auto;
		background-color: ${args.theme?.().color.bg.base};
	`}
`

export const App = () => (
  <ThemeProvider>
    <Wrapper>
      <Router>
        <Layout>
          <Header />
          <Spacing top="medium" bottom="medium">
            <Routes />
          </Spacing>
        </Layout>
      </Router>
    </Wrapper>
  </ThemeProvider>
)
