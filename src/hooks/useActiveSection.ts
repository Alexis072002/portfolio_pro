import { useState, useEffect } from 'react'

export const useActiveSection = (sectionIds: string[], threshold: number = 0.5) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0])

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold,
        }

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersect, observerOptions)

        sectionIds.forEach((id) => {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => {
            sectionIds.forEach((id) => {
                const element = document.getElementById(id)
                if (element) {
                    observer.unobserve(element)
                }
            })
        }
    }, [sectionIds, threshold])

    return activeSection
}
