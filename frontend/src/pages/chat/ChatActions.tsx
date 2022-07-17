import { createSignal, For } from "solid-js"

import { styled } from "solid-styled-components"

import {
  IconButton,
  TextInput,
  Camera,
  Share,
  Send,
  MoreVertical,
  Smile,
} from "../../components"
import { Tooltip } from "../../components/display/tooltip/Tooltip"
import { tokens } from "../../theme"

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.small};
`

const MoreActions = () => (
  <TooltipContent>
    <IconButton icon={Camera} caption="Extract picture" />
    <IconButton icon={Share} caption="Share chat context" />
  </TooltipContent>
)

const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${tokens.space.small};
`
const Emojis = [
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
    <For each={Emojis}>
      {emoji => (
        <IconButton.styled onClick={() => props.addEmoji(emoji)}>
          <Emoji emoji={emoji} />
        </IconButton.styled>
      )}
    </For>
  </EmojiGrid>
)

export const ChatActions = () => {
  let ref: HTMLInputElement
  const [open, setOpen] = createSignal(false)
  const [emojis, setEmojis] = createSignal(false)

  const addEmoji = (emoji: string) => {
    ref.value += emoji
  }

  return (
    <Layout>
      <TextInput ref={r => (ref = r)} />
      <Tooltip
        Content={() => <AllEmojis addEmoji={addEmoji} />}
        open={emojis()}
        onClose={() => setEmojis(o => !o)}
        position="top"
      >
        <IconButton
          onClick={() => setEmojis(o => !o)}
          icon={Smile}
          caption="Emojis"
        />
      </Tooltip>
      <IconButton icon={Send} caption="Send message" />
      <Tooltip
        Content={MoreActions}
        open={open()}
        onClose={() => setOpen(o => !o)}
        position="top"
      >
        <IconButton
          icon={MoreVertical}
          onClick={() => setOpen(o => !o)}
          caption="More actions"
        />
      </Tooltip>
    </Layout>
  )
}
