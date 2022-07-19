import { createEffect, createSignal, onCleanup, onMount } from "solid-js"

const PREFIX = "minigue-"

const STORAGE = window.localStorage

const setStorageItem = <T>(key: string, value: T) =>
  STORAGE.setItem(key, JSON.stringify(value))

const parseStorageItem = <T>(stringValue: string | null) => {
  if (stringValue == null) return null
  try {
    return JSON.parse(stringValue) as T
  } catch {
    return null
  }
}

const initiateStorage = <T>(key: string, initialValue: T) => {
  const value = parseStorageItem<T>(STORAGE.getItem(key))

  if (value === null) {
    STORAGE.setItem(key, JSON.stringify(initialValue))
    return initialValue
  }

  return value
}

interface Options {
  sync?: boolean
}

export const createStorageSignal = <T>(
  key: string,
  initialValue: T,
  options?: Options
) => {
  const prefixedKey = PREFIX + key
  const [value, setValue] = createSignal(
    initiateStorage(prefixedKey, initialValue)
  )

  const listener = ({ newValue, key }: StorageEvent) =>
    options?.sync &&
    key === prefixedKey &&
    setValue(old => parseStorageItem<T>(newValue) || old)

  onMount(() => window.addEventListener("storage", listener))
  onCleanup(() => window.removeEventListener("storage", listener))

  createEffect(() => {
    setStorageItem(prefixedKey, value())
  })

  return [value, setValue] as const
}
