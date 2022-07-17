import { TooltipProps } from "./Tooltip"

export const opositePosition = ({ position }: Pick<TooltipProps, "position">) =>
  position === "left"
    ? "right"
    : position === "right"
    ? "left"
    : position === "bottom"
    ? "top"
    : "bottom"
