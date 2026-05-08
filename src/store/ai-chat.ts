import { create } from 'zustand'
import type { ChatMessage } from '@/types/core'

export type ChatMode = 'general' | 'concept'

interface AIChatStore {
  isOpen: boolean
  activeMode: ChatMode

  generalHistory: ChatMessage[]
  conceptHistories: Record<string, ChatMessage[]>

  currentConceptId: string | undefined
  currentConceptTitle: string | undefined

  open: () => void
  close: () => void
  toggle: () => void
  setActiveMode: (mode: ChatMode) => void

  setConceptContext: (conceptId: string, conceptTitle: string) => void
  clearConceptContext: () => void

  addToGeneral: (msgs: ChatMessage[]) => void
  addToConcept: (conceptId: string, msgs: ChatMessage[]) => void
  clearGeneralHistory: () => void
  clearConceptHistory: (conceptId: string) => void
  popLastGeneral: () => void
  popLastConcept: (conceptId: string) => void
}

export const useAIChatStore = create<AIChatStore>((set) => ({
  isOpen: false,
  activeMode: 'general',

  generalHistory: [],
  conceptHistories: {},

  currentConceptId: undefined,
  currentConceptTitle: undefined,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  setActiveMode: (mode) => set({ activeMode: mode }),

  setConceptContext: (conceptId, conceptTitle) =>
    set({ currentConceptId: conceptId, currentConceptTitle: conceptTitle }),

  clearConceptContext: () =>
    set((s) => ({
      currentConceptId: undefined,
      currentConceptTitle: undefined,
      activeMode: s.activeMode === 'concept' ? 'general' : s.activeMode,
    })),

  addToGeneral: (msgs) =>
    set((s) => ({ generalHistory: [...s.generalHistory, ...msgs] })),

  addToConcept: (conceptId, msgs) =>
    set((s) => ({
      conceptHistories: {
        ...s.conceptHistories,
        [conceptId]: [...(s.conceptHistories[conceptId] ?? []), ...msgs],
      },
    })),

  clearGeneralHistory: () => set({ generalHistory: [] }),

  clearConceptHistory: (conceptId) =>
    set((s) => ({
      conceptHistories: { ...s.conceptHistories, [conceptId]: [] },
    })),

  popLastGeneral: () =>
    set((s) => ({ generalHistory: s.generalHistory.slice(0, -1) })),

  popLastConcept: (conceptId) =>
    set((s) => ({
      conceptHistories: {
        ...s.conceptHistories,
        [conceptId]: (s.conceptHistories[conceptId] ?? []).slice(0, -1),
      },
    })),
}))
