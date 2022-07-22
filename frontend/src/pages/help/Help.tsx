import { For } from "solid-js"

import { styled } from "solid-styled-components"

import help from "../../assets/help.json"
import { Collapsible, Main, Text } from "../../components"
import { tokens } from "../../theme"

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.medium};
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  margin: -0.5rem;
  padding: 0.5rem;
  margin-right: -1.5rem;
  padding-right: 1.5rem;
`

export const Help = () => (
  <Main>
    <ScrollContainer>
      <Text.Large as="h1">Q & A</Text.Large>
      <For each={help}>
        {({ title, text }) => <Collapsible title={title}>{text}</Collapsible>}
      </For>
    </ScrollContainer>
  </Main>
)
