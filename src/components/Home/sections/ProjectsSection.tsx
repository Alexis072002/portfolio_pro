import React from 'react'
import { ProjectCarousel } from '@/components/Work/ProjectCarousel'
import { PORTFOLIO_PROJECTS } from '@/data/projects'

interface ProjectsSectionProps {
  language: 'en' | 'fr'
  projectsIntro: string
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ language, projectsIntro }) => {
  return (
    <section id="projects" className="w-full py-24 md:py-26 px-5 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white">
            {language === 'fr'
              ? <>Projets <span className="text-accent italic">portfolio</span></>
              : <>Portfolio <span className="text-accent italic">projects</span></>}
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base max-w-3xl mx-auto">
            {projectsIntro}
          </p>
        </div>

        <ProjectCarousel projects={PORTFOLIO_PROJECTS} />
      </div>
    </section>
  )
}
