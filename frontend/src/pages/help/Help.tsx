import { For } from "solid-js"

import { styled } from "solid-styled-components"

import { Collapsible, Main, Message, Text } from "../../components"
import help from "../../data/help"

const AnswerPosition = styled.div`
  max-width: 70%;
  margin-left: auto;
`

export const Help = () => (
  <Main>
    <Text.Large as="h1">Q & A</Text.Large>
    <Main.ScrollArea>
      <For each={help}>
        {({ title, text }) => (
          <Collapsible title={title}>
            <AnswerPosition>
              <Message origin="user">{text}</Message>
            </AnswerPosition>
          </Collapsible>
        )}
      </For>
    </Main.ScrollArea>
  </Main>
)
