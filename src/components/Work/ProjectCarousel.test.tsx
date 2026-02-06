import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProjectCarousel } from './ProjectCarousel'

describe('ProjectCarousel', () => {
    const mockProjects = [
        {
            title: 'Project 1',
            category: 'Cat 1',
            imageUrl: '/img1.jpg',
            year: '2026'
        },
        {
            title: 'Project 2',
            category: 'Cat 2',
            imageUrl: '/img2.jpg',
            year: '2025'
        }
    ]

    it('renders all provided projects', () => {
        render(<ProjectCarousel projects={mockProjects} />)

        expect(screen.getByText('Project 1')).toBeInTheDocument()
        expect(screen.getByText('Project 2')).toBeInTheDocument()
    })

    it('contains navigation instructions or controls', () => {
        render(<ProjectCarousel projects={mockProjects} />)
        // We'll look for custom attributes or text that indicates it's a carousel
        const carousel = screen.getByRole('region', { name: /project carousel/i })
        expect(carousel).toBeInTheDocument()
    })
})
