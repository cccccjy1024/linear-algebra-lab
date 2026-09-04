import { useMemo } from 'react'
import katex from 'katex'

interface Props {
  tex: string
  display?: boolean
}

export default function MathTex({ tex, display = false }: Props) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false
      })
    } catch {
      return tex
    }
  }, [tex, display])

  return display ? (
    <div className="math-display" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
