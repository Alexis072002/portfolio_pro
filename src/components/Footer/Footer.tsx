"use client"

import React from 'react'
import { LanguageSwitcher } from '@/components/Language/LanguageSwitcher'
import { useLanguage } from '@/components/Language/LanguageProvider'

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()
    const { language } = useLanguage()
    const copyrightLine = language === 'fr'
        ? `© ${currentYear} Alexis Dezeque. Portfolio freelance.`
        : `© ${currentYear} Alexis Dezeque. Freelance portfolio.`
    const stackLine = language === 'fr'
        ? 'React / Next.js / NestJS'
        : 'React / Next.js / NestJS'
    const emailLabel = language === 'fr' ? 'E-mail' : 'Email'

    return (
        <footer className="w-full py-16 px-8 bg-black border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-sans tracking-widest uppercase text-white/20">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
                <p>{copyrightLine}</p>
                <div className="hidden md:block w-px h-4 bg-white/10" />
                <p className="font-light">{stackLine}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <LanguageSwitcher />
                <a href="https://www.linkedin.com/in/alexis-dezeque-935446175/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300 hover:tracking-[0.3em]">LinkedIn</a>
                <a href="https://github.com/Alexis072002" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300 hover:tracking-[0.3em]">GitHub</a>
                <a href="mailto:hello@alexis.dev" className="hover:text-accent transition-all duration-300 hover:tracking-[0.3em]">{emailLabel}</a>
            </div>
        </footer>
    )
}
