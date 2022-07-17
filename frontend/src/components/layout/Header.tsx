import { For } from "solid-js"

import { styled } from "solid-styled-components"

import { routes } from "../../pages/Routes"
import { tokens } from "../../theme"
import { ThemeToggle } from "../inputs"
import { IconButton } from "../inputs/IconButton"
import { Github, Spacing } from "../primitives"
import { Link } from "../primitives/Link"
import { surfaceStyles } from "./surfaceStyles"

const Flex = styled.div`
  flex: 1;
`

const Layout = styled.header`
  min-height: ${tokens.space.largest};
  height: ${tokens.space.largest};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navigation = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  gap: ${tokens.space.large};
  padding: 0 ${tokens.space.large};
  border-radius: ${tokens.borderRadius};
  ${surfaceStyles}
`

const openRepository = () =>
  window.open("https://github.com/Eeeeelias/miniguept-chat", "_blank")

export const Header = () => (
  <Layout>
    <Navigation>
      <For each={routes}>
        {({ path, label }) => (
          <Link href={path} end>
            {label}
          </Link>
        )}
      </For>
    </Navigation>
    <Flex />
    <IconButton
      onClick={openRepository}
      icon={Github}
      caption="Open github repository"
    />
    <Spacing right="medium" />
    <ThemeToggle />
  </Layout>
)
