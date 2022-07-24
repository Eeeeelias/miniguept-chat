import { createSignal, For } from "solid-js"

import { styled } from "solid-styled-components"

import { IconButton, Smile, Tooltip } from "../../../components"
import { tokens } from "../../../theme"

const emojis = [
  "😆",
  "🤣",
  "😅",
  "😊",
  "😎",
  "🤠",
  "😢",
  "😭",
  "❤️",
  "👍",
  "👌",
  "🖕",
]

const Emoji = styled.div<{ emoji: string }>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "${args => args.emoji}";
    display: inline-block;
  }
`

const EmojiGrid = styled.div`
  display: grid;
  grid-gap: ${tokens.space.smallest};
  grid-template-columns: repeat(4, auto);
`

const AllEmojis = (props: { addEmoji: (e: string) => void }) => (
  <EmojiGrid>
    <For each={emojis}>
      {emoji => (
        <IconButton.styled onClick={() => props.addEmoji(emoji)}>
          <Emoji emoji={emoji} />
        </IconButton.styled>
      )}
    </For>
  </EmojiGrid>
)

interface EmojiTooltipProps {
  addEmoji: (emoji: string) => void
}

export const Emojis = (props: EmojiTooltipProps) => {
  const [open, setOpen] = createSignal(false)
  const toggle = () => setOpen(open => !open)

  return (
    <Tooltip
      Content={() => <AllEmojis addEmoji={props.addEmoji} />}
      open={open()}
      onClose={toggle}
      position="top"
    >
      <IconButton onClick={toggle} icon={Smile} caption="Emojis" />
    </Tooltip>
  )
}
