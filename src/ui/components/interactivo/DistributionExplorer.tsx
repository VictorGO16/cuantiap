'use client'

import { useState, useEffect, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { DATASETS } from '@/modules/interactivo/datasets'
import { useDataset, getNumericColumn, filterByCategory } from './useDataset'
import { mean, sd, median, skewness, kurtosis, histogram } from './stats'
import { useAIChatStore } from '@/store/ai-chat'
import type { AnalysisContext, DescriptiveStats } from '@/types/core'

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sidebar rounded-lg px-3 py-2.5 border border-border">
      <p className="text-2xs text-ink-faint uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-medium text-ink tabular-nums">{value}</p>
    </div>
  )
}

export function DistributionExplorer() {
  const [datasetId, setDatasetId] = useState('')
  const [variableId, setVariableId] = useState('')
  const [filterCol, setFilterCol] = useState('')
  const [filterVal, setFilterVal] = useState('')

  const meta = DATASETS.find((d) => d.id === datasetId)
  const { data, loading } = useDataset(meta?.filename ?? null)
  const setDataContext = useAIChatStore((s) => s.setDataContext)
  const clearDataContext = useAIChatStore((s) => s.clearDataContext)

  useEffect(() => {
    setVariableId('')
    setFilterCol('')
    setFilterVal('')
  }, [datasetId])

  useEffect(() => {
    setFilterVal('')
  }, [filterCol])

  const filtered = useMemo(() => {
    if (!data.length) return data
    return filterCol && filterVal ? filterByCategory(data, filterCol, filterVal) : data
  }, [data, filterCol, filterVal])

  const nums = useMemo(() => {
    if (!variableId || !filtered.length) return []
    return getNumericColumn(filtered, variableId)
  }, [filtered, variableId])

  const stats = useMemo((): DescriptiveStats | null => {
    if (nums.length < 2) return null
    return {
      n: nums.length,
      mean: parseFloat(mean(nums).toFixed(3)),
      sd: parseFloat(sd(nums).toFixed(3)),
      median: parseFloat(median(nums).toFixed(3)),
      min: parseFloat(Math.min(...nums).toFixed(3)),
      max: parseFloat(Math.max(...nums).toFixed(3)),
      skewness: parseFloat(skewness(nums).toFixed(3)),
      kurtosis: parseFloat(kurtosis(nums).toFixed(3)),
    }
  }, [nums])

  const bins = useMemo(() => nums.length ? histogram(nums, 20) : [], [nums])

  const varLabel = meta?.continuousVars.find((v) => v.id === variableId)?.label ?? variableId
  const catVarValues = meta?.categoricalVars.find((c) => c.id === filterCol)?.values ?? []

  useEffect(() => {
    if (!stats || !meta || !variableId) { clearDataContext(); return }
    const ctx: AnalysisContext = {
      tool: 'distribuciones',
      datasetId: meta.id,
      datasetLabel: meta.label,
      variableId,
      variableLabel: varLabel,
      groupById: filterCol || undefined,
      groupByLabel: filterCol ? meta.categoricalVars.find((c) => c.id === filterCol)?.label : undefined,
      results: {
        descriptives: stats,
        filter: filterVal ? `${filterCol} = ${filterVal}` : undefined,
      },
    }
    setDataContext(ctx)
    return () => clearDataContext()
  }, [stats, meta, variableId, varLabel, filterCol, filterVal, setDataContext, clearDataContext])

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Dataset</label>
          <select
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value)}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">— Seleccionar —</option>
            {DATASETS.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Variable</label>
          <select
            value={variableId}
            onChange={(e) => setVariableId(e.target.value)}
            disabled={!meta}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent disabled:text-ink-faint disabled:bg-sidebar"
          >
            <option value="">— Seleccionar —</option>
            {meta?.continuousVars.map((v) => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Filtrar por</label>
          <select
            value={filterCol}
            onChange={(e) => setFilterCol(e.target.value)}
            disabled={!meta}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent disabled:text-ink-faint disabled:bg-sidebar"
          >
            <option value="">Sin filtro</option>
            {meta?.categoricalVars.map((v) => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Valor del filtro</label>
          <select
            value={filterVal}
            onChange={(e) => setFilterVal(e.target.value)}
            disabled={!filterCol}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent disabled:text-ink-faint disabled:bg-sidebar"
          >
            <option value="">Todos</option>
            {catVarValues.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-ink-faint">Cargando datos...</p>
      )}

      {stats && (
        <>
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">
              {varLabel}
              {filterVal && <span className="font-normal text-ink-muted ml-2">— {filterCol}: {filterVal}</span>}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              <StatCard label="n" value={stats.n.toString()} />
              <StatCard label="Media" value={stats.mean.toFixed(3)} />
              <StatCard label="DE" value={stats.sd.toFixed(3)} />
              <StatCard label="Mediana" value={stats.median.toFixed(3)} />
              <StatCard label="Mín" value={stats.min.toFixed(3)} />
              <StatCard label="Máx" value={stats.max.toFixed(3)} />
              <StatCard label="Asimetría" value={stats.skewness.toFixed(3)} />
              <StatCard label="Curtosis" value={stats.kurtosis.toFixed(3)} />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-3">Distribución de frecuencias</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={bins} margin={{ top: 4, right: 8, bottom: 24, left: 0 }}>
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: '#78716C' }}
                  interval="preserveStartEnd"
                  label={{ value: varLabel, position: 'insideBottom', offset: -12, fontSize: 11, fill: '#78716C' }}
                />
                <YAxis tick={{ fontSize: 10, fill: '#78716C' }} width={32} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: '1px solid #E7E5E4', borderRadius: 6 }}
                  formatter={(v) => [v ?? 0, 'Frecuencia']}
                  labelFormatter={(l) => `Valor ≈ ${l}`}
                />
                <ReferenceLine x={stats.mean.toFixed(2)} stroke="#1D4ED8" strokeDasharray="4 2" strokeWidth={1.5} />
                <Bar dataKey="count" fill={meta?.color ?? '#1D4ED8'} opacity={0.85} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-2xs text-ink-faint mt-1">La línea punteada azul marca la media.</p>
          </div>
        </>
      )}

      {!datasetId && (
        <div className="text-center py-16 text-ink-faint text-sm">
          Selecciona un dataset y una variable para ver la distribución.
        </div>
      )}
    </div>
  )
}
