import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SideNav } from './SideNav'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.prototype.observe = vi.fn()
mockIntersectionObserver.prototype.unobserve = vi.fn()
mockIntersectionObserver.prototype.disconnect = vi.fn()
window.IntersectionObserver = mockIntersectionObserver

describe('SideNav', () => {
    const sections = ['hero', 'work', 'about', 'contact']

    it('renders all section dots', () => {
        render(<SideNav sections={sections} activeSection="hero" />)
        sections.forEach(id => {
            const link = screen.getByTestId(`nav-dot-${id}`)
            expect(link).toBeInTheDocument()
        })
    })

    it('applies glowing class to the active dot', () => {
        render(<SideNav sections={sections} activeSection="work" />)
        const activeDot = screen.getByTestId('nav-dot-work')
        expect(activeDot).toHaveClass('shadow-[0_0_15px_rgba(56,189,248,0.6)]')
        expect(activeDot).toHaveClass('bg-accent')
    })

    it('has liquid glass styling', () => {
        render(<SideNav sections={sections} activeSection="hero" />)
        const container = screen.getByRole('navigation')
        expect(container).toHaveClass('backdrop-blur-xl')
        expect(container).toHaveClass('bg-white/5')
    })
})
