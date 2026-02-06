import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MeshBackground } from './MeshBackground'

describe('MeshBackground', () => {
    it('renders correctly with the mesh gradient class', () => {
        render(<MeshBackground data-testid="mesh-bg" />)
        const element = screen.getByTestId('mesh-bg')
        expect(element).toBeInTheDocument()
        // In Tailwind v4, we use the custom utility defined in globals.css
        expect(element).toHaveClass('bg-mesh')
    })
})
