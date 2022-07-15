import { For } from "solid-js"

import { styled } from "solid-styled-components"

import { routes } from "../../pages/Routes"
import { tokens } from "../../theme"
import { ThemeToggle } from "../inputs"
import { Link } from "../primitives/Link"

const Layout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navigation = styled.nav`
  ${args => `
    display: flex;
    align-items: center;
    gap: ${tokens.space.large};
    padding: ${tokens.space.medium} ${tokens.space.large};
    border-radius: ${tokens.space.medium};
    background-color: ${args.theme?.().bg.surface};
    box-shadow: ${tokens.shadow.medium(args.theme?.().bg.base)};
  `}
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
    <ThemeToggle />
  </Layout>
)
