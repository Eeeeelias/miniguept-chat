import { For } from "solid-js"

import { styled } from "solid-styled-components"

import help from "../../assets/help.json"
import { Collapsible, Main, Message, Text } from "../../components"

const AnswerPosition = styled.div`
  display: flex;
  flex-direction: column;
`

export const Help = () => (
  <Main>
    <Text.Large as="h1">Q & A</Text.Large>
    <Main.ScrollArea>
      <For each={help}>
        {({ title, text }) => (
          <Collapsible title={title}>
            <AnswerPosition>
              <Message message={text} origin="user" />
            </AnswerPosition>
          </Collapsible>
        )}
      </For>
    </Main.ScrollArea>
  </Main>
)
