import React from 'react'

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full py-16 px-8 bg-black border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-sans tracking-widest uppercase text-white/20">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
                <p>&copy; {currentYear} Alexis. Built for Impact.</p>
                <div className="hidden md:block w-px h-4 bg-white/10" />
                <p className="font-light">Crafted with Passion & Next.js</p>
            </div>

            <div className="flex gap-8">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300 hover:tracking-[0.3em]">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300 hover:tracking-[0.3em]">GitHub</a>
                <a href="mailto:hello@alexis.dev" className="hover:text-accent transition-all duration-300 hover:tracking-[0.3em]">Email</a>
            </div>
        </footer>
    )
}
