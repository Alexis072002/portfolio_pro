import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProjectCard } from './ProjectCard'

describe('ProjectCard', () => {
    const mockProject = {
        title: 'Cyber Helmet 2077',
        category: 'UX Design / Fullstack',
        imageUrl: '/images/project-1.jpg',
        year: '2026'
    }

    it('renders project basic information correctly', () => {
        render(<ProjectCard {...mockProject} />)

        expect(screen.getByText('Cyber Helmet 2077')).toBeInTheDocument()
        expect(screen.getByText('UX Design / Fullstack')).toBeInTheDocument()
        expect(screen.getByText('2026')).toBeInTheDocument()
    })

    it('displays the project image', () => {
        render(<ProjectCard {...mockProject} />)
        const image = screen.getByAltText('Cyber Helmet 2077')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', expect.stringContaining('project-1.jpg'))
    })
})
