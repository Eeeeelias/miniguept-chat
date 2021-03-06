import { NavLink } from "solid-app-router"
import { styled } from "solid-styled-components"

export const Link = styled(NavLink)`
  ${args => `
    display: inline-block;
    color: ${args.theme?.().fg.base};
    position: relative;
    &:after{
      content: "";
      display: inline-block;
      position: absolute;
      height: 2px;
      left: calc(50% - 0.25rem);
      right: calc(50% - 0.25rem);
      bottom: -2px;
      transition: 0.2s ease-in-out;
      transition-property: left, right;
      background-color: currentColor;
      opacity: 0.5;
    }
    &[aria-current] {
      color: ${args.theme?.().accent.alt};
      &:after {
        right: 0.5rem;
        left: 0.5rem;
      }
    }
    &:hover, &:focus-visible {
      color: ${args.theme?.().accent.base};
      &:after {
        right: 0.25rem;
        left: 0.25rem;
      }
    }
  `}
`
