import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'

// Mock ResizeObserver
class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

window.ResizeObserver = ResizeObserver

// Mock IntersectionObserver
class IntersectionObserver {
    root: Element | Document | null = null
    rootMargin = ''
    thresholds: ReadonlyArray<number> = [0]

    observe() { }
    unobserve() { }
    disconnect() { }
    takeRecords() {
        return []
    }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserver)

// Mock MatchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock next/image
vi.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
        const rest = { ...props }
        delete rest.fill
        return React.createElement('img', { ...rest, src: props.src })
    },
}))
