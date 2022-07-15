import { Router } from "solid-app-router"
import { styled } from "solid-styled-components"

import { Header } from "./components/layout"
import { getTextStyles } from "./components/primitives/Text"
import { Routes } from "./pages/Routes"
import { ThemeProvider, tokens } from "./theme"

const Wrapper = styled.div`
  ${getTextStyles}
  ${args => `
		height: 100%;
		width: 100%;
		padding: ${tokens.space.largest};
		padding-top: ${tokens.space.medium};
		background-color: ${args.theme?.().bg.base};
		color: ${args.theme?.().fg.base};
	`}
`

const Layout = styled.div`
  ${args => `
		max-width: 800px;
		max-height: 100%;
		height: 100%;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		gap: ${tokens.space.medium};

		background-color: ${args.theme?.().bg.base};
	`}
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
    </Wrapper>
  </ThemeProvider>
)
