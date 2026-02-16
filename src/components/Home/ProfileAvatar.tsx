import Image from 'next/image'
import React from 'react'

interface ProfileAvatarProps {
  photoSrc: string
  isPhotoAvailable: boolean
  onImageError: () => void
  wrapperClassName: string
  imageClassName: string
  initialsClassName?: string
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  photoSrc,
  isPhotoAvailable,
  onImageError,
  wrapperClassName,
  imageClassName,
  initialsClassName
}) => {
  return (
    <span className={`relative overflow-hidden shrink-0 border border-white/20 bg-black/60 ${wrapperClassName}`}>
      <span className={`absolute inset-0 flex items-center justify-center text-white/70 font-semibold tracking-wide ${initialsClassName ?? 'text-xs'}`}>
        AD
      </span>
      {isPhotoAvailable && (
        <Image
          src={photoSrc}
          alt="Alexis Dezeque portrait"
          fill
          sizes="(max-width: 768px) 64px, 96px"
          className={imageClassName}
          onError={onImageError}
        />
      )}
    </span>
  )
}
