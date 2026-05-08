'use client'

import { useEffect } from 'react'
import { useAIChatStore } from '@/store/ai-chat'

interface ContextUpdaterProps {
  conceptId?: string
  conceptTitle?: string
}

export function ContextUpdater({ conceptId, conceptTitle }: ContextUpdaterProps) {
  const setConceptContext = useAIChatStore((s) => s.setConceptContext)
  const clearConceptContext = useAIChatStore((s) => s.clearConceptContext)

  useEffect(() => {
    if (conceptId && conceptTitle) {
      setConceptContext(conceptId, conceptTitle)
    } else {
      clearConceptContext()
    }
  }, [conceptId, conceptTitle, setConceptContext, clearConceptContext])

  return null
}
