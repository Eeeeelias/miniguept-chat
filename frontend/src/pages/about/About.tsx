import { styled } from "solid-styled-components"

import { focusOutline, Main } from "../../components"
import AboutContent from "../../data/about"
import { tokens } from "../../theme"

const Styles = styled.div`
  section {
    position: relative;
    padding-bottom: ${tokens.space.medium};
    margin-bottom: ${tokens.space.large};
  }
  section:last-of-type {
    margin-bottom: 0;
  }
  section:not(:last-of-type)::after {
    content: "";
    position: absolute;
    display: block;
    background-color: ${args => args.theme?.().fg.muted};
    height: 1px;
    bottom: 0;
    left: ${tokens.space.medium};
    right: ${tokens.space.medium};
  }
  p {
    text-align: justify;
    line-height: 150%;
  }
  img {
    width: 100%;
    height: 20rem;
    margin: ${tokens.space.large} 0;
    object-fit: contain;
    object-position: center;
    margin-left: auto;
  }
  a {
    color: ${args => args.theme?.().accent.base};
    font-weight: 500;
    border-radius: 0.25rem;
  }
  a:hover {
    text-decoration: underline;
    color: ${args => args.theme?.().accent.alt};
  }
  a:focus-visible {
    ${focusOutline}
    outline-offset: 2px;
  }
`

export const About = () => (
  <Main>
    <Main.ScrollArea>
      <Styles>
        <AboutContent />
      </Styles>
    </Main.ScrollArea>
  </Main>
)
