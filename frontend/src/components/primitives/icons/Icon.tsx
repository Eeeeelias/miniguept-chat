import { Component, ParentProps, splitProps } from "solid-js"

export interface IconProps {
  color?: string
  size?: string | number
  className?: string
}

export type FeatherIcon = Component<IconProps>

export const GenericIcon = (props: IconProps & ParentProps) => {
  const [{ color = "currentColor", size = "24" }, rest] = splitProps(props, [
    "color",
    "size",
  ])
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...rest}
    >
      {props.children}
    </svg>
  )
}
