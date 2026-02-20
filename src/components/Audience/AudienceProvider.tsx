"use client"

import React, { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react'

export type AudienceMode = 'recruiter' | 'client'

type AudienceContextValue = {
  audience: AudienceMode
  setAudience: (nextAudience: AudienceMode) => void
}

const AUDIENCE_STORAGE_KEY = 'portfolio_audience_mode'
let inMemoryAudience: AudienceMode = 'client'
const listeners = new Set<() => void>()

const isAudience = (value: string | null): value is AudienceMode => value === 'recruiter' || value === 'client'

const getSnapshot = (): AudienceMode => {
  if (typeof window === 'undefined') {
    return inMemoryAudience
  }

  try {
    const storedAudience = window.localStorage.getItem(AUDIENCE_STORAGE_KEY)
    if (isAudience(storedAudience)) {
      inMemoryAudience = storedAudience
      return storedAudience
    }
  } catch {
    // Ignore storage access issues and keep in-memory fallback.
  }

  return inMemoryAudience
}

const getServerSnapshot = (): AudienceMode => 'client'

const subscribe = (listener: () => void) => {
  listeners.add(listener)

  if (typeof window === 'undefined') {
    return () => {
      listeners.delete(listener)
    }
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === AUDIENCE_STORAGE_KEY) {
      listener()
    }
  }

  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

const notifyAll = () => {
  listeners.forEach((listener) => listener())
}

const AudienceContext = createContext<AudienceContextValue>({
  audience: 'client',
  setAudience: () => undefined
})

export const AudienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audience = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setAudience = useCallback((nextAudience: AudienceMode) => {
    inMemoryAudience = nextAudience
    try {
      window.localStorage.setItem(AUDIENCE_STORAGE_KEY, nextAudience)
    } catch {
      // Ignore storage write issues and rely on in-memory value.
    }
    notifyAll()
  }, [])

  const value = useMemo(() => ({ audience, setAudience }), [audience, setAudience])

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
}

export const useAudience = () => useContext(AudienceContext)
