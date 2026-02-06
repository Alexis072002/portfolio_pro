import React from 'react'

interface MeshBackgroundProps extends React.HTMLAttributes<HTMLDivElement> { }

export const MeshBackground: React.FC<MeshBackgroundProps> = ({ className, ...props }) => {
    return (
        <div
            className={`bg-mesh min-h-screen w-full transition-all duration-700 ease-in-out ${className || ''}`}
            {...props}
        />
    )
}
