import { createSignal } from "solid-js"

import { styled } from "solid-styled-components"

import { Modal, Text, Spacing, Button, createStorageSignal } from "./components"
import { tokens } from "./theme"

const Section = styled.section`
  margin-bottom: ${tokens.space.largest};

  h3 {
    margin-bottom: ${tokens.space.small};
  }
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${tokens.space.medium};
`

export const Disclaimer = () => {
  const [firstVisit, setFirstVisit] = createStorageSignal("first-visit", true)
  const [open, setOpen] = createSignal(true)
  return (
    <Modal open={firstVisit() && open()}>
      <Text.Large as="h2">Before you start chatting...</Text.Large>
      <Text.Medium>...please read the following.</Text.Medium>
      <Spacing bottom="largest" />
      <Section>
        <Text.SemiLarge as="h3">
          {">"} Don't overinterpret minigues statements.
        </Text.SemiLarge>
        <Text.Medium>
          The bots opinions do not mirror our opinions. In fact, it doesn't have
          any opinion for real. We are really sorry if anything the bot writes
          makes you uncomfortable. Please report the negative messages with the
          "thumb down" button.
        </Text.Medium>
      </Section>
      <Section>
        <Text.SemiLarge as="h3">
          {">"} We will not ask for your consent.
        </Text.SemiLarge>
        <Text.Medium>
          However, thats due to the fact that we don't harass you with those
          shady tracking things. Therefore you can feel save around here.
          <Spacing bottom="medium" />
          (Please always ask for consent before doing shady things... At best
          just dont do shady things. 💩)
        </Text.Medium>
      </Section>
      <ButtonRow>
        <Button look="border" onClick={() => setFirstVisit(false)}>
          Don't show this again
        </Button>
        <Button look="filled" onClick={() => setOpen(false)}>
          Confirm
        </Button>
      </ButtonRow>
    </Modal>
  )
}
