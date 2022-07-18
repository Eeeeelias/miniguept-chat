import { createEffect, createSignal } from "solid-js"

const PREFIX = "minigue-"

const STORAGE = window.localStorage

const setStorageItem = <T extends unknown>(key: string, value: T) =>
  STORAGE.setItem(PREFIX + key, JSON.stringify(value))

const parseStorageItem = <ValueType>(key: string) => {
  const stringValue = STORAGE.getItem(key)
  if (stringValue == null) return null

  try {
    return JSON.parse(stringValue) as ValueType
  } catch {
    return null
  }
}

const initiateStorage = <T extends unknown>(key: string, initialValue: T) => {
  const value = parseStorageItem<T>(key)

  if (value === null) {
    STORAGE.setItem(key, JSON.stringify(initialValue))
    return initialValue
  }

  return value
}

export const createStorageSignal = <T extends unknown>(
  key: string,
  initialValue: T
) => {
  const [value, setValue] = createSignal(
    initiateStorage(PREFIX + key, initialValue)
  )

  createEffect(() => {
    setStorageItem(key, value())
  })

  return [value, setValue] as const
}
