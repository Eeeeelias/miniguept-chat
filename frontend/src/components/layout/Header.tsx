import { For } from "solid-js"

import { styled } from "solid-styled-components"

import { routes } from "../../pages/Routes"
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
    gap: ${args.theme?.().space.large};
    padding: ${args.theme?.().space.medium} ${args.theme?.().space.large};
    border-radius: ${args.theme?.().space.medium};
    background-color: ${args.theme?.().color.bg.surface};
    box-shadow: ${args.theme?.().shadow.medium(args.theme?.().color.bg.base)};
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
