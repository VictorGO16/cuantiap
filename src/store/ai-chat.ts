import { create } from 'zustand'
import type { ChatMessage, AnalysisContext } from '@/types/core'

export type ChatMode = 'general' | 'concept' | 'data'

interface AIChatStore {
  isOpen: boolean
  activeMode: ChatMode

  generalHistory: ChatMessage[]
  conceptHistories: Record<string, ChatMessage[]>
  dataHistory: ChatMessage[]

  currentConceptId: string | undefined
  currentConceptTitle: string | undefined
  dataContext: AnalysisContext | undefined

  open: () => void
  close: () => void
  toggle: () => void
  setActiveMode: (mode: ChatMode) => void

  setConceptContext: (conceptId: string, conceptTitle: string) => void
  clearConceptContext: () => void

  setDataContext: (ctx: AnalysisContext) => void
  clearDataContext: () => void

  addToGeneral: (msgs: ChatMessage[]) => void
  addToConcept: (conceptId: string, msgs: ChatMessage[]) => void
  addToData: (msgs: ChatMessage[]) => void
  clearGeneralHistory: () => void
  clearConceptHistory: (conceptId: string) => void
  clearDataHistory: () => void
  popLastGeneral: () => void
  popLastConcept: (conceptId: string) => void
  popLastData: () => void
}

export const useAIChatStore = create<AIChatStore>((set) => ({
  isOpen: false,
  activeMode: 'general',

  generalHistory: [],
  conceptHistories: {},
  dataHistory: [],

  currentConceptId: undefined,
  currentConceptTitle: undefined,
  dataContext: undefined,

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

  setDataContext: (ctx) => set({ dataContext: ctx }),

  clearDataContext: () =>
    set((s) => ({
      dataContext: undefined,
      activeMode: s.activeMode === 'data' ? 'general' : s.activeMode,
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

  addToData: (msgs) =>
    set((s) => ({ dataHistory: [...s.dataHistory, ...msgs] })),

  clearGeneralHistory: () => set({ generalHistory: [] }),

  clearConceptHistory: (conceptId) =>
    set((s) => ({
      conceptHistories: { ...s.conceptHistories, [conceptId]: [] },
    })),

  clearDataHistory: () => set({ dataHistory: [] }),

  popLastGeneral: () =>
    set((s) => ({ generalHistory: s.generalHistory.slice(0, -1) })),

  popLastConcept: (conceptId) =>
    set((s) => ({
      conceptHistories: {
        ...s.conceptHistories,
        [conceptId]: (s.conceptHistories[conceptId] ?? []).slice(0, -1),
      },
    })),

  popLastData: () =>
    set((s) => ({ dataHistory: s.dataHistory.slice(0, -1) })),
}))
