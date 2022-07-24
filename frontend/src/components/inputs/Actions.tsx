import { ParentProps, Show } from "solid-js"

import { styled } from "solid-styled-components"

import { Message } from "../../pages/chat/provider/ChatContext"
import { tokens } from "../../theme"
import { Icon, RotateCCW, ThumbsDown, ThumbsUp, Trash } from "../primitives"
import { IconButton } from "./IconButton"

const Vote = styled.div<{ color: "success" | "error" }>`
  position: absolute;
  right: 0.25rem;
  bottom: 0.25rem;
  color: ${args => args.theme?.().alert[args.color]};
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Votes = (props: Pick<Message, "vote">) => (
  <>
    <Show when={props.vote === true}>
      <Vote color="success">
        <Icon icon={ThumbsUp} inheritColor />
      </Vote>
    </Show>
    <Show when={props.vote === false}>
      <Vote color="error">
        <Icon icon={ThumbsDown} inheritColor />
      </Vote>
    </Show>
  </>
)

const Layout = styled.div`
  position: relative;
  width: fit-content;
  padding: ${tokens.space.medium};
  margin: -${tokens.space.medium};
`

const ActionBar = styled.div<AlignProps>`
  position: absolute;
  top: -0.5rem;
  ${args => args.align || "left"}: 1.5rem;
  padding: 2px;
  width: fit-content;

  display: none;
  :focus > &,
  :hover > &,
  &:hover {
    display: flex;
    align-items: center;
  }
`

interface AlignProps {
  align: "left" | "right"
}

interface ActionsProps
  extends ParentProps,
    AlignProps,
    Pick<Message, "origin" | "vote"> {
  onDelete?: () => void
  onReset?: () => void
  onVote?: (feedback: boolean) => void
}

export const Actions = (props: ActionsProps) => (
  <Layout>
    {props.children}
    <Show when={props.vote !== undefined}>
      <Votes vote={props.vote} />
    </Show>
    <ActionBar align={props.align}>
      <Show when={props.origin === "bot" && props.vote === undefined}>
        <IconButton
          icon={ThumbsUp}
          caption="Upvote this message"
          onClick={() => props.onVote?.(true)}
        />
        <IconButton
          icon={ThumbsDown}
          caption="Downvote this message"
          onClick={() => props.onVote?.(false)}
        />
      </Show>
      <IconButton
        icon={Trash}
        caption="Delete message"
        onClick={props.onDelete}
      />
      <IconButton
        icon={RotateCCW}
        caption="Rewind chat to message"
        onClick={props.onReset}
      />
    </ActionBar>
  </Layout>
)
