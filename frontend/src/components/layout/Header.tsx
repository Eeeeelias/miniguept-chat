import { For } from "solid-js"

import { styled } from "solid-styled-components"

import { routes } from "../../pages/Routes"
import { tokens } from "../../theme"
import { ThemeToggle } from "../inputs"
import { Github, Icon, Spacing } from "../primitives"
import { Link } from "../primitives/Link"
import { surfaceStyles } from "./surfaceStyles"

const Flex = styled.div`
  flex: 1;
`

const Layout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${tokens.space.large};
  padding: ${tokens.space.medium} ${tokens.space.large};
  border-radius: ${tokens.borderRadius};
  ${surfaceStyles}
`

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
    <Icon icon={Github} />
    <Spacing right="medium" />
    <ThemeToggle />
  </Layout>
)
