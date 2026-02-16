"use client"

import React, { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react"

export type Language = "en" | "fr"

type LanguageContextValue = {
  language: Language
  setLanguage: (nextLanguage: Language) => void
}

const LANGUAGE_STORAGE_KEY = "portfolio_language_mode"
let inMemoryLanguage: Language = "en"
const listeners = new Set<() => void>()

const isLanguage = (value: string | null): value is Language => value === "en" || value === "fr"

const getSnapshot = (): Language => {
  if (typeof window === "undefined") {
    return inMemoryLanguage
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (isLanguage(storedLanguage)) {
      inMemoryLanguage = storedLanguage
      return storedLanguage
    }
  } catch {
    // Ignore storage access issues and keep in-memory fallback.
  }

  return inMemoryLanguage
}

const getServerSnapshot = (): Language => "en"

const subscribe = (listener: () => void) => {
  listeners.add(listener)

  if (typeof window === "undefined") {
    return () => {
      listeners.delete(listener)
    }
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) {
      listener()
    }
  }

  window.addEventListener("storage", onStorage)

  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

const notifyAll = () => {
  listeners.forEach((listener) => listener())
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => undefined
})

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLanguage = useCallback((nextLanguage: Language) => {
    inMemoryLanguage = nextLanguage
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    } catch {
      // Ignore storage write issues and rely on in-memory value.
    }
    notifyAll()
  }, [])

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
