import React from 'react'

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full py-12 px-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-sans text-foreground/40">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                <p>&copy; {currentYear} Alexis. All rights reserved.</p>
                <p>Built with Next.js, Tailwind v4 & Passion.</p>
            </div>

            <div className="flex gap-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
                <a href="mailto:hello@alexis.dev" className="hover:text-accent transition-colors">Email</a>
            </div>
        </footer>
    )
}
