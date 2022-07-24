import { keyframes, styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { inputShadow } from "../base"

const animation = keyframes`
  0% {
    transform: translateY(0);
  }
  12% {
    transform: translateY(-0.25rem);
  }
  25% {
    transform: translateY(0);
  }
`

const Layout = styled.span`
  display: inline-flex;
  height: ${tokens.space.medium};
  width: ${tokens.space.large};
  justify-content: space-between;
  align-items: flex-end;
`

const Bobble = styled.span<{ index: number }>`
  display: inline-block;
  height: 6px;
  width: 6px;
  background-color: currentColor;
  border-radius: 50%;
  ${inputShadow}

  animation: ${animation} 1.5s infinite
    cubic-bezier(0.5, -0.7, 0.5, 1.7);
  animation-delay: ${args => args.index * 0.1}s;
`

export const Loading = () => (
  <Layout>
    <Bobble index={1} />
    <Bobble index={2} />
    <Bobble index={3} />
  </Layout>
)
