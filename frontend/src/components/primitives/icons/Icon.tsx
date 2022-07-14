import { Component, JSX, splitProps } from "solid-js";

export interface IconProps {
  color?: string;
  size?: string | number;
  className?: string;
}

export type FeatherIcon = Component<IconProps>

type IconFactory = (paths: JSX.Element) => FeatherIcon

export const createIcon: IconFactory = (paths) => (props) => {
  const [{color = "currentColor", size = "24"}, rest] = splitProps(props, ["color", "size"]);
  return (<svg
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
    {paths}
  </svg>
)}
