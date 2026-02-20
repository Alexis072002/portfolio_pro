"use client"

import React, { useEffect, useId, useState } from 'react'

type MermaidRenderResult = {
  svg: string
}

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void
  render: (id: string, definition: string) => Promise<MermaidRenderResult>
}

declare global {
  interface Window {
    mermaid?: MermaidApi
    __mermaidCdnPromise?: Promise<MermaidApi>
  }
}

const MERMAID_SCRIPT_ID = 'mermaid-cdn-script'
const MERMAID_SCRIPT_SRC = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'

const loadMermaidFromCdn = (): Promise<MermaidApi> => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Mermaid can only run in the browser.'))
  }

  if (window.mermaid) {
    return Promise.resolve(window.mermaid)
  }

  if (window.__mermaidCdnPromise) {
    return window.__mermaidCdnPromise
  }

  window.__mermaidCdnPromise = new Promise<MermaidApi>((resolve, reject) => {
    const existingScript = document.getElementById(MERMAID_SCRIPT_ID) as HTMLScriptElement | null

    const onLoaded = () => {
      if (window.mermaid) {
        resolve(window.mermaid)
        return
      }
      reject(new Error('Mermaid script loaded but API is unavailable.'))
    }

    if (existingScript) {
      if (window.mermaid) {
        resolve(window.mermaid)
        return
      }
      existingScript.addEventListener('load', onLoaded, { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Mermaid script.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = MERMAID_SCRIPT_ID
    script.src = MERMAID_SCRIPT_SRC
    script.async = true
    script.addEventListener('load', onLoaded, { once: true })
    script.addEventListener('error', () => reject(new Error('Failed to load Mermaid script.')), { once: true })
    document.head.appendChild(script)
  })

  return window.__mermaidCdnPromise
}

type MermaidDiagramProps = {
  definition: string
  className?: string
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ definition, className }) => {
  const reactId = useId()
  const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [svgMarkup, setSvgMarkup] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    loadMermaidFromCdn()
      .then((mermaidApi) => {
        mermaidApi.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'dark'
        })
        return mermaidApi.render(diagramId, definition)
      })
      .then(({ svg }) => {
        if (!isActive) {
          return
        }
        setSvgMarkup(svg)
        setError('')
      })
      .catch(() => {
        if (!isActive) {
          return
        }
        setError('Unable to render Mermaid diagram right now.')
      })

    return () => {
      isActive = false
    }
  }, [definition, diagramId])

  if (error) {
    return (
      <div className={className}>
        <p className="text-white/55 text-sm leading-relaxed">{error}</p>
      </div>
    )
  }

  if (!svgMarkup) {
    return (
      <div className={className}>
        <p className="text-white/55 text-sm leading-relaxed">Rendering architecture diagram...</p>
      </div>
    )
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  )
}

