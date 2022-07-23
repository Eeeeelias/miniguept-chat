import { ParentProps } from "solid-js"

import { styled } from "solid-styled-components"

import { tokens } from "../../theme"
import { RotateCCW, ThumbsDown, ThumbsUp, Trash } from "../primitives"
import { IconButton } from "./IconButton"

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

  :focus > &,
  :hover > &,
  &:hover {
    display: flex;
  }
  align-items: center;

  display: none;
`

interface AlignProps {
  align: "left" | "right"
}

interface ActionsProps extends ParentProps, AlignProps {
  onDelete?: () => void
  onReset?: () => void
  onVote?: (feedback: boolean) => void
}

export const Actions = (props: ActionsProps) => (
  <Layout>
    {props.children}
    <ActionBar align={props.align}>
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
      <IconButton
        icon={RotateCCW}
        caption="Rewind chat to message"
        onClick={props.onReset}
      />
      <IconButton
        icon={Trash}
        caption="Delete message"
        onClick={props.onDelete}
      />
    </ActionBar>
  </Layout>
)
