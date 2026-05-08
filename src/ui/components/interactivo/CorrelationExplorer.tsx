'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useDataset } from './useDataset'
import { pearsonR, mean, sd, formatP } from './stats'
import { tPValue } from './stats'
import { DATASETS } from '@/modules/interactivo/datasets'
import { useAIChatStore } from '@/store/ai-chat'
import type { RawRow } from './useDataset'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CorrResult {
  pairs: { x: number; y: number }[]
  r: number
  r2: number
  pValue: number
  n: number
  slope: number
  intercept: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  interp: Interp
}

interface Interp {
  label: string
  description: string
  color: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function interpretR(r: number): Interp {
  const abs = Math.abs(r)
  const dir = r >= 0 ? 'positiva' : 'negativa'
  if (abs < 0.10) return {
    label: 'Sin correlación',
    description: 'La relación entre las dos variables es prácticamente nula.',
    color: 'text-ink-faint',
  }
  if (abs < 0.30) return {
    label: `Débil ${dir}`,
    description: 'Asociación muy tenue. La varianza compartida es baja.',
    color: 'text-ink-muted',
  }
  if (abs < 0.50) return {
    label: `Moderada ${dir}`,
    description: 'Relación clara y consistente, aunque no determinante.',
    color: 'text-blue-600',
  }
  if (abs < 0.70) return {
    label: `Moderada-alta ${dir}`,
    description: 'Asociación sustantivamente relevante. Típica de validez convergente.',
    color: 'text-blue-700',
  }
  return {
    label: `Alta ${dir}`,
    description: 'Asociación fuerte. Considerar posibles variables de confusión.',
    color: 'text-accent',
  }
}

function computeCorrelation(data: RawRow[], varX: string, varY: string): CorrResult | null {
  const pairs = data
    .map(row => ({ x: parseFloat(row[varX]), y: parseFloat(row[varY]) }))
    .filter(p => isFinite(p.x) && isFinite(p.y))

  if (pairs.length < 5) return null

  const xs = pairs.map(p => p.x)
  const ys = pairs.map(p => p.y)
  const n = pairs.length
  const r = pearsonR(xs, ys)
  const r2 = r * r
  const tStat = Math.abs(r) < 0.9999 ? r * Math.sqrt(n - 2) / Math.sqrt(1 - r2) : Infinity
  const pValue = isFinite(tStat) ? tPValue(Math.abs(tStat), n - 2) : 0

  const xMn = mean(xs)
  const yMn = mean(ys)
  const sdX = sd(xs)
  const sdY = sd(ys)
  const slope = sdX > 0 ? r * (sdY / sdX) : 0
  const intercept = yMn - slope * xMn

  return {
    pairs, r, r2, pValue, n, slope, intercept,
    xMin: Math.min(...xs),
    xMax: Math.max(...xs),
    yMin: Math.min(...ys),
    yMax: Math.max(...ys),
    interp: interpretR(r),
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RScale({ r }: { r: number }) {
  const pct = ((r + 1) / 2) * 100
  const isNeg = r < 0
  const fillLeft = isNeg ? pct : 50
  const fillWidth = Math.abs(pct - 50)

  return (
    <div className="space-y-1.5">
      <div className="relative h-2 rounded-full bg-border">
        {/* Center tick */}
        <div className="absolute left-1/2 top-0 w-px h-full bg-border-dark opacity-40" />
        {/* Fill */}
        <motion.div
          className="absolute h-full rounded-full bg-accent"
          initial={false}
          animate={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ opacity: isNeg ? 0.5 : 0.7 }}
        />
        {/* Marker */}
        <motion.div
          className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-ink bg-white shadow-md"
          style={{ translateY: '-50%' }}
          initial={false}
          animate={{ left: `calc(${pct}% - 8px)` }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <div className="flex justify-between text-2xs text-ink-faint px-0.5">
        <span>−1</span>
        <span>0</span>
        <span>+1</span>
      </div>
    </div>
  )
}

function StatBlock({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-2xs text-ink-faint uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-bold text-ink tabular-nums leading-none">{value}</span>
      {sub && <span className="text-2xs text-ink-faint">{sub}</span>}
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label className="text-2xs font-medium text-ink-muted uppercase tracking-wide">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent truncate max-w-[260px]"
      >
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

function EmptyState({ bothSelected }: { bothSelected: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[320px] gap-5 text-center px-8 select-none">
      {/* Mini scatter illustration */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-30">
        <circle cx="12" cy="50" r="3" fill="#1C1917" />
        <circle cx="20" cy="42" r="3" fill="#1C1917" />
        <circle cx="28" cy="36" r="3" fill="#1C1917" />
        <circle cx="16" cy="46" r="3" fill="#1C1917" />
        <circle cx="36" cy="28" r="3" fill="#1C1917" />
        <circle cx="44" cy="22" r="3" fill="#1C1917" />
        <circle cx="52" cy="14" r="3" fill="#1C1917" />
        <circle cx="40" cy="18" r="3" fill="#1C1917" />
        <line x1="8" y1="56" x2="58" y2="8" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-ink-muted">
          {bothSelected ? 'Cargando datos…' : 'Selecciona dos variables'}
        </p>
        <p className="text-xs text-ink-faint leading-relaxed max-w-[280px]">
          {bothSelected
            ? 'Calculando la correlación entre las variables seleccionadas.'
            : 'Elige un dataset y dos variables continuas para explorar si existe una relación estadística entre ellas.'}
        </p>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CorrelationExplorer() {
  const [datasetId, setDatasetId] = useState(DATASETS[0].id)
  const [varX, setVarX] = useState('')
  const [varY, setVarY] = useState('')

  const setDataContext = useAIChatStore(s => s.setDataContext)
  const clearDataContext = useAIChatStore(s => s.clearDataContext)

  const meta = DATASETS.find(d => d.id === datasetId)!
  const { data, loading } = useDataset(meta.filename)

  function handleDataset(id: string) {
    setDatasetId(id)
    setVarX('')
    setVarY('')
    clearDataContext()
  }

  function handleVarX(id: string) {
    setVarX(id)
    if (id === varY) setVarY('')
  }

  const vars = meta.continuousVars
  const varXMeta = vars.find(v => v.id === varX)
  const varYMeta = vars.find(v => v.id === varY)

  const result = useMemo<CorrResult | null>(() => {
    if (!varX || !varY || !data.length) return null
    return computeCorrelation(data, varX, varY)
  }, [data, varX, varY])

  useEffect(() => {
    if (!result) { clearDataContext(); return }
    setDataContext({
      tool: 'variables',
      datasetId: meta.id,
      datasetLabel: meta.label,
      variableId: varY,
      variableLabel: varYMeta?.label ?? varY,
      groupById: varX,
      groupByLabel: varXMeta?.label ?? varX,
      results: {
        test: {
          type: 'r',
          statistic: result.r,
          df: String(result.n - 2),
          pValue: result.pValue,
          effectSize: result.r2,
          effectLabel: result.interp.label,
          significant: result.pValue < 0.05,
        },
      },
    })
    return clearDataContext
  }, [result]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasSelection = !!varX && !!varY
  const showChart = hasSelection && !loading && !!result

  // Single array: scatter points sorted by x, each carrying its own regression y.
  // Both <Scatter dataKey="y"> and <Line dataKey="regY"> read from the same parent
  // data, which is the only reliable pattern in recharts ComposedChart.
  const chartData = useMemo(() => {
    if (!result) return []
    return [...result.pairs]
      .sort((a, b) => a.x - b.x)
      .map(p => ({
        x: p.x,
        y: p.y,
        regY: result.slope * p.x + result.intercept,
      }))
  }, [result])

  const xPad = result ? (result.xMax - result.xMin) * 0.04 : 0
  const yPad = result ? (result.yMax - result.yMin) * 0.06 : 0
  const xDomain: [number, number] = result
    ? [result.xMin - xPad, result.xMax + xPad]
    : [0, 1]
  const yDomain: [number, number] = result
    ? [result.yMin - yPad, result.yMax + yPad]
    : [0, 1]

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <SelectField
          label="Dataset"
          value={datasetId}
          onChange={handleDataset}
          placeholder=""
          options={DATASETS.map(d => ({ value: d.id, label: d.label }))}
        />
        <SelectField
          label="Variable X — eje horizontal"
          value={varX}
          onChange={handleVarX}
          placeholder="— elegir —"
          options={vars.map(v => ({ value: v.id, label: v.label }))}
        />
        <SelectField
          label="Variable Y — eje vertical"
          value={varY}
          onChange={v => setVarY(v)}
          placeholder="— elegir —"
          options={vars.filter(v => v.id !== varX).map(v => ({ value: v.id, label: v.label }))}
        />
      </div>

      {/* Main area */}
      <AnimatePresence mode="wait">
        {!showChart ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="rounded-2xl border border-border bg-white">
              <EmptyState bothSelected={hasSelection && loading} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`${datasetId}-${varX}-${varY}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Scatter plot */}
            <div className="bg-white rounded-2xl border border-border pt-5 pr-5 pb-2 pl-2">
              <ResponsiveContainer width="100%" height={360}>
                <ComposedChart
                  data={chartData}
                  margin={{ top: 4, right: 4, bottom: 36, left: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" opacity={0.7} />
                  <XAxis
                    dataKey="x"
                    type="number"
                    domain={xDomain}
                    tick={{ fontSize: 10, fill: '#A8A29E' }}
                    tickCount={6}
                    tickFormatter={v => Number(v).toFixed(1)}
                    label={{
                      value: varXMeta?.label ?? varX,
                      position: 'insideBottom',
                      offset: -22,
                      fontSize: 11,
                      fill: '#78716C',
                    }}
                  />
                  <YAxis
                    type="number"
                    domain={yDomain}
                    tick={{ fontSize: 10, fill: '#A8A29E' }}
                    width={48}
                    tickCount={6}
                    tickFormatter={v => Number(v).toFixed(1)}
                    label={{
                      value: varYMeta?.label ?? varY,
                      angle: -90,
                      position: 'insideLeft',
                      offset: 12,
                      fontSize: 11,
                      fill: '#78716C',
                    }}
                  />
                  <Tooltip content={() => null} cursor={false} />
                  {/* Scatter reads y from parent data via dataKey */}
                  <Scatter
                    dataKey="y"
                    fill={meta.color}
                    opacity={0.45}
                    isAnimationActive={false}
                    r={3}
                  />
                  {/* Line reads regY from parent data — smooth regression line */}
                  <Line
                    dataKey="regY"
                    stroke="#1D4ED8"
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                    type="linear"
                    strokeOpacity={0.85}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Stats + interpretation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stat values */}
              <div className="bg-white rounded-2xl border border-border px-6 py-5">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  <StatBlock
                    label="r de Pearson"
                    value={result.r.toFixed(2)}
                  />
                  <StatBlock
                    label="r²"
                    value={result.r2.toFixed(2)}
                    sub={`${(result.r2 * 100).toFixed(0)}% varianza compartida`}
                  />
                  <StatBlock
                    label="Valor p"
                    value={formatP(result.pValue)}
                    sub={result.pValue < 0.05 ? 'Estadísticamente significativa' : 'No significativa (α = .05)'}
                  />
                  <StatBlock
                    label="n"
                    value={String(result.n)}
                    sub="pares válidos"
                  />
                </div>
              </div>

              {/* Interpretation */}
              <div className="bg-white rounded-2xl border border-border px-6 py-5 flex flex-col justify-between gap-4">
                <div>
                  <p className={`text-base font-semibold mb-1 ${result.interp.color}`}>
                    {result.interp.label}
                  </p>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {result.interp.description}
                  </p>
                  {result.r2 > 0.04 && (
                    <p className="text-xs text-ink-faint mt-2.5 leading-relaxed">
                      <span className="font-medium text-ink-muted">{varXMeta?.label ?? varX}</span>
                      {' '}explica el{' '}
                      <span className="font-medium text-ink-muted">{(result.r2 * 100).toFixed(0)}%</span>
                      {' '}de la varianza de{' '}
                      <span className="font-medium text-ink-muted">{varYMeta?.label ?? varY}</span>.
                    </p>
                  )}
                </div>
                <RScale r={result.r} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
