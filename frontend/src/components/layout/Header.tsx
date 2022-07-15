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
  ${props => `
    display: flex;
    align-items: center;
    gap: ${props.theme?.().space.large};
    padding: ${props.theme?.().space.medium};
    border-radius: ${props.theme?.().space.medium};
    background-color: ${props.theme?.().color.bg.surface};
    box-shadow: ${props.theme?.().shadow.medium(props.theme?.().color.bg.base)};
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
