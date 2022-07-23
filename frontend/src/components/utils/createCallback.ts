import { createMemo } from "solid-js"

export const createCallback = <Args extends unknown[], Returns>(
  callback: (...args: Args) => Returns
) => createMemo(() => callback)
