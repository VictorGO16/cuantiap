'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Papa from 'papaparse'
import { DATASETS } from '@/modules/interactivo/datasets'

type Level = 'nominal' | 'ordinal' | 'intervalo' | 'razón'
type Phase = 'playing' | 'answered' | 'complete'

const LEVELS: { id: Level; label: string; short: string }[] = [
  { id: 'nominal',   label: 'Nominal',   short: 'Categorías sin orden' },
  { id: 'ordinal',   label: 'Ordinal',   short: 'Categorías con orden' },
  { id: 'intervalo', label: 'Intervalo', short: 'Sin cero absoluto' },
  { id: 'razón',     label: 'Razón',     short: 'Con cero absoluto' },
]

interface VarStats { min: number; max: number; mean: number }

interface Card {
  id: string
  label: string
  type: string
  values: string
  numKey?: string
  correct: Level
  explanation: string
  datasetLabel: string
  datasetColor: string
}

function buildCards(): Card[] {
  const cards: Card[] = []
  for (const ds of DATASETS) {
    for (const v of ds.categoricalVars) {
      const ordinalKeywords = ['Bajo', 'Medio', 'Alto', '1°', '2°', 'Básica', 'Media', 'Técnico', 'Operativo', 'Profesional', 'tramo']
      const isOrdinal = ordinalKeywords.some((kw) => v.values.some((val) => val.includes(kw)))
      cards.push({
        id: `${ds.id}-cat-${v.id}`,
        label: v.label,
        type: 'Categórica',
        values: v.values.slice(0, 4).join(' · ') + (v.values.length > 4 ? ' …' : ''),
        correct: isOrdinal ? 'ordinal' : 'nominal',
        explanation: isOrdinal
          ? 'Las categorías tienen un orden inherente pero las distancias entre ellas no son iguales ni cuantificables — nivel ordinal.'
          : 'Las categorías son mutuamente excluyentes pero no tienen un orden inherente — nivel nominal.',
        datasetLabel: ds.label,
        datasetColor: ds.color,
      })
    }
    for (const v of ds.continuousVars) {
      const isRazon = ['años', 'horas', 'sesiones', 'créditos', 'meses', 'n_hijos', 'minutos']
        .some((kw) => v.label.toLowerCase().includes(kw))
      cards.push({
        id: `${ds.id}-num-${v.id}`,
        numKey: `${ds.id}::${v.id}`,
        label: v.label,
        type: 'Numérica continua',
        values: '',
        correct: isRazon ? 'razón' : 'intervalo',
        explanation: isRazon
          ? 'Tiene un cero absoluto y real (p. ej., 0 horas = ausencia total) — nivel de razón.'
          : 'Puntajes de escala psicológica: se tratan como intervalo asumiendo distancias iguales, sin cero absoluto.',
        datasetLabel: ds.label,
        datasetColor: ds.color,
      })
    }
  }
  return cards
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const BASE_CARDS = buildCards()

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface SummaryProps {
  correct: number
  total: number
  maxStreak: number
  onRestart: () => void
}

function SummaryScreen({ correct, total, maxStreak, onRestart }: SummaryProps) {
  const pct = Math.round((correct / total) * 100)
  const rating = pct >= 85 ? 'Excelente dominio' : pct >= 65 ? 'Buen desempeño' : 'Necesita repaso'
  const ratingColor = pct >= 85 ? 'text-green-700' : pct >= 65 ? 'text-blue-700' : 'text-amber-700'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-white rounded-2xl border border-border p-8 text-center space-y-6">
        <div>
          <p className="text-5xl font-bold text-ink tabular-nums">{pct}%</p>
          <p className={`text-sm font-semibold mt-2 ${ratingColor}`}>{rating}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-sidebar rounded-xl p-3">
            <p className="text-xl font-bold text-ink tabular-nums">{correct}</p>
            <p className="text-2xs text-ink-faint mt-0.5">Correctas</p>
          </div>
          <div className="bg-sidebar rounded-xl p-3">
            <p className="text-xl font-bold text-ink tabular-nums">{total - correct}</p>
            <p className="text-2xs text-ink-faint mt-0.5">Incorrectas</p>
          </div>
          <div className="bg-sidebar rounded-xl p-3">
            <p className="text-xl font-bold text-ink tabular-nums">{maxStreak}</p>
            <p className="text-2xs text-ink-faint mt-0.5">Racha máx.</p>
          </div>
        </div>

        <button onClick={onRestart} className="btn-primary w-full">
          Jugar de nuevo
        </button>
      </div>
    </motion.div>
  )
}

export function VariableClassifier() {
  const [datasetFilter, setDatasetFilter] = useState('')
  const [deck, setDeck] = useState<Card[]>(() => shuffle(BASE_CARDS))
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('playing')
  const [selected, setSelected] = useState<Level | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [statsMap, setStatsMap] = useState<Record<string, VarStats>>({})

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const computed: Record<string, VarStats> = {}
      await Promise.all(
        DATASETS.map(async (ds) => {
          try {
            const res = await fetch(`/data/${ds.filename}`)
            const text = await res.text()
            const { data } = Papa.parse<Record<string, string>>(text, {
              header: true,
              skipEmptyLines: true,
            })
            for (const v of ds.continuousVars) {
              const vals = data
                .map((r) => parseFloat(r[v.id]))
                .filter((x) => isFinite(x))
              if (!vals.length) continue
              const sum = vals.reduce((a, b) => a + b, 0)
              computed[`${ds.id}::${v.id}`] = {
                min: Math.min(...vals),
                max: Math.max(...vals),
                mean: sum / vals.length,
              }
            }
          } catch { /* skip */ }
        })
      )
      if (!cancelled) setStatsMap(computed)
    })()
    return () => { cancelled = true }
  }, [])

  function startSession(filter: string) {
    const base = filter ? BASE_CARDS.filter((c) => c.id.startsWith(filter + '-')) : BASE_CARDS
    setDeck(shuffle(base))
    setIdx(0)
    setPhase('playing')
    setSelected(null)
    setCorrectCount(0)
    setStreak(0)
    setMaxStreak(0)
  }

  function handleFilter(id: string) {
    setDatasetFilter(id)
    startSession(id)
  }

  const card = deck[idx]
  const total = deck.length
  const isAnswered = phase === 'answered'
  const isRight = selected !== null && card !== undefined && selected === card.correct

  function handleSelect(level: Level) {
    if (phase !== 'playing' || !card) return
    const right = level === card.correct
    setSelected(level)
    setPhase('answered')
    const newStreak = right ? streak + 1 : 0
    setStreak(newStreak)
    setMaxStreak((m) => Math.max(m, newStreak))
    if (right) setCorrectCount((c) => c + 1)
  }

  function handleNext() {
    if (idx + 1 >= total) {
      setPhase('complete')
    } else {
      setIdx((i) => i + 1)
      setPhase('playing')
      setSelected(null)
    }
  }

  if (phase === 'complete') {
    return (
      <SummaryScreen
        correct={correctCount}
        total={total}
        maxStreak={maxStreak}
        onRestart={() => startSession(datasetFilter)}
      />
    )
  }

  if (!card) return null

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Dataset filter pills */}
      <div className="flex flex-wrap gap-1.5">
        {[{ id: '', label: 'Todos' }, ...DATASETS.map((d) => ({ id: d.id, label: d.label }))].map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleFilter(opt.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-100 ${
              datasetFilter === opt.id
                ? 'bg-ink text-white border-ink'
                : 'bg-white text-ink-muted border-border hover:border-ink-faint hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Progress bar + counter + streak */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-border rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-ink rounded-full"
            animate={{ width: `${(idx / total) * 100}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
        <span className="text-2xs text-ink-faint tabular-nums flex-shrink-0">
          {idx + 1} / {total}
        </span>
        <AnimatePresence>
          {streak >= 2 && (
            <motion.span
              key="streak"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-2xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex-shrink-0"
            >
              {streak} seguidas
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -24, opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          className="bg-white rounded-2xl border border-border p-6 space-y-5"
        >
          {/* Variable info */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="text-2xs font-medium px-2.5 py-1 rounded-full border"
                style={{
                  color: card.datasetColor,
                  borderColor: card.datasetColor + '50',
                  background: card.datasetColor + '14',
                }}
              >
                {card.datasetLabel}
              </span>
              <span className="text-2xs text-ink-faint">{card.type}</span>
            </div>
            <h3 className="text-lg font-semibold text-ink leading-snug">{card.label}</h3>
            {card.numKey ? (
              statsMap[card.numKey] ? (
                <p className="text-xs text-ink-faint mt-1.5 font-mono tabular-nums">
                  min {statsMap[card.numKey].min.toFixed(2)}
                  <span className="mx-2 text-ink-faint/50">·</span>
                  media {statsMap[card.numKey].mean.toFixed(2)}
                  <span className="mx-2 text-ink-faint/50">·</span>
                  max {statsMap[card.numKey].max.toFixed(2)}
                </p>
              ) : (
                <p className="text-xs text-ink-faint/40 mt-1.5">—</p>
              )
            ) : card.values ? (
              <p className="text-xs text-ink-faint mt-1.5 italic leading-relaxed">{card.values}</p>
            ) : null}
          </div>

          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
            ¿Qué nivel de medición tiene esta variable?
          </p>

          {/* Answer grid */}
          <div className="grid grid-cols-2 gap-2">
            {LEVELS.map((level) => {
              const isSelected = selected === level.id
              const isCorrectLevel = level.id === card.correct
              let cls = 'relative border rounded-xl px-4 py-3 text-left transition-all duration-150 '
              if (!isAnswered) {
                cls += 'border-border bg-white hover:border-ink/25 hover:bg-sidebar active:scale-[0.98] cursor-pointer'
              } else if (isCorrectLevel) {
                cls += 'border-green-400 bg-green-50 cursor-default'
              } else if (isSelected) {
                cls += 'border-red-300 bg-red-50 cursor-default opacity-80'
              } else {
                cls += 'border-border bg-white cursor-default opacity-35'
              }
              return (
                <button
                  key={level.id}
                  className={cls}
                  onClick={() => handleSelect(level.id)}
                  disabled={isAnswered}
                >
                  <p className="text-sm font-semibold text-ink">{level.label}</p>
                  <p className="text-2xs text-ink-faint mt-0.5 leading-snug">{level.short}</p>
                  {isAnswered && isCorrectLevel && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.15, delay: 0.05 }}
                      className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-400 flex items-center justify-center"
                    >
                      <CheckIcon />
                    </motion.span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div
                  className={`rounded-xl px-4 py-3 ${
                    isRight
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-amber-50 border border-amber-200'
                  }`}
                >
                  <p className={`text-sm font-semibold mb-1 ${isRight ? 'text-green-800' : 'text-amber-800'}`}>
                    {isRight ? 'Correcto' : `Incorrecto — es ${card.correct}`}
                  </p>
                  <p className={`text-xs leading-relaxed ${isRight ? 'text-green-700' : 'text-amber-700'}`}>
                    {card.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Next / restart row */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex justify-between items-center"
          >
            <button
              onClick={() => startSession(datasetFilter)}
              className="text-xs text-ink-faint hover:text-ink-muted transition-colors"
            >
              Reiniciar
            </button>
            <button onClick={handleNext} className="btn-primary">
              {idx + 1 >= total ? 'Ver resultados' : 'Siguiente'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
