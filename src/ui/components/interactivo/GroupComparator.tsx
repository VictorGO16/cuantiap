'use client'

import { useState, useEffect, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ErrorBar } from 'recharts'
import { DATASETS } from '@/modules/interactivo/datasets'
import { useDataset, getNumericColumn, groupByCategory } from './useDataset'
import { mean, sd, welchTTest, oneWayAnova, formatP, cohenDLabel, etaSqLabel } from './stats'
import { useAIChatStore } from '@/store/ai-chat'
import type { AnalysisContext, GroupStats, TestResult } from '@/types/core'

function ResultBadge({ sig }: { sig: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
      sig ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-sidebar text-ink-muted border border-border'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${sig ? 'bg-green-500' : 'bg-ink-faint'}`} />
      {sig ? 'p < .05 — diferencia significativa' : 'p ≥ .05 — diferencia no significativa'}
    </span>
  )
}

export function GroupComparator() {
  const [datasetId, setDatasetId] = useState('')
  const [variableId, setVariableId] = useState('')
  const [groupById, setGroupById] = useState('')

  const meta = DATASETS.find((d) => d.id === datasetId)
  const { data, loading } = useDataset(meta?.filename ?? null)
  const setDataContext = useAIChatStore((s) => s.setDataContext)
  const clearDataContext = useAIChatStore((s) => s.clearDataContext)

  useEffect(() => { setVariableId(''); setGroupById('') }, [datasetId])

  const groupedData = useMemo(() => {
    if (!variableId || !groupById || !data.length) return {}
    return groupByCategory(data, groupById, variableId)
  }, [data, variableId, groupById])

  const groups: GroupStats[] = useMemo(() => {
    return Object.entries(groupedData).map(([name, vals]) => ({
      name,
      n: vals.length,
      mean: parseFloat(mean(vals).toFixed(3)),
      sd: parseFloat(sd(vals).toFixed(3)),
    }))
  }, [groupedData])

  const test: TestResult | null = useMemo(() => {
    const groupArrays = Object.values(groupedData).filter((g) => g.length >= 2)
    if (groupArrays.length < 2) return null

    if (groupArrays.length === 2) {
      const r = welchTTest(groupArrays[0], groupArrays[1])
      return {
        type: 't',
        statistic: parseFloat(r.t.toFixed(3)),
        df: r.df.toString(),
        pValue: r.pValue,
        effectSize: parseFloat(r.cohenD.toFixed(3)),
        effectLabel: cohenDLabel(r.cohenD),
        significant: r.significant,
      }
    }

    const r = oneWayAnova(groupArrays)
    return {
      type: 'anova',
      statistic: parseFloat(r.F.toFixed(3)),
      df: `${r.df1}, ${r.df2}`,
      pValue: r.pValue,
      effectSize: parseFloat(r.etaSq.toFixed(3)),
      effectLabel: etaSqLabel(r.etaSq),
      significant: r.significant,
    }
  }, [groupedData])

  const varLabel = meta?.continuousVars.find((v) => v.id === variableId)?.label ?? variableId
  const groupLabel = meta?.categoricalVars.find((c) => c.id === groupById)?.label ?? groupById

  const chartData = groups.map((g) => ({
    name: g.name,
    mean: g.mean,
    error: g.sd,
    n: g.n,
  }))

  useEffect(() => {
    if (!test || !meta || !variableId || !groupById) { clearDataContext(); return }
    const ctx: AnalysisContext = {
      tool: 'grupos',
      datasetId: meta.id,
      datasetLabel: meta.label,
      variableId,
      variableLabel: varLabel,
      groupById,
      groupByLabel: groupLabel,
      results: { groups, test },
    }
    setDataContext(ctx)
    return () => clearDataContext()
  }, [test, meta, variableId, varLabel, groupById, groupLabel, groups, setDataContext, clearDataContext])

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Dataset</label>
          <select
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value)}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">— Seleccionar —</option>
            {DATASETS.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Variable dependiente (continua)</label>
          <select
            value={variableId}
            onChange={(e) => setVariableId(e.target.value)}
            disabled={!meta}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent disabled:text-ink-faint disabled:bg-sidebar"
          >
            <option value="">— Seleccionar —</option>
            {meta?.continuousVars.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Variable de agrupación (categórica)</label>
          <select
            value={groupById}
            onChange={(e) => setGroupById(e.target.value)}
            disabled={!meta}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent disabled:text-ink-faint disabled:bg-sidebar"
          >
            <option value="">— Seleccionar —</option>
            {meta?.categoricalVars.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
          </select>
        </div>
      </div>

      {loading && <p className="text-sm text-ink-faint">Cargando datos...</p>}

      {groups.length >= 2 && test && (
        <>
          {/* Chart */}
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">
              {varLabel} <span className="font-normal text-ink-muted">según</span> {groupLabel}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#78716C' }} />
                <YAxis tick={{ fontSize: 11, fill: '#78716C' }} width={36} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: '1px solid #E7E5E4', borderRadius: 6 }}
                  formatter={(v, name) => [
                    typeof v === 'number' ? v.toFixed(3) : v,
                    name === 'mean' ? 'Media' : 'DE',
                  ]}
                />
                <Bar dataKey="mean" fill={meta?.color ?? '#1D4ED8'} opacity={0.85} radius={[3, 3, 0, 0]}>
                  <ErrorBar dataKey="error" width={6} strokeWidth={2} stroke={meta?.color ?? '#1D4ED8'} opacity={0.6} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-2xs text-ink-faint mt-1">Las barras muestran la media; las líneas de error corresponden a ±1 DE.</p>
          </div>

          {/* Stats table */}
          <div>
            <h3 className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">Descriptivos por grupo</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">Grupo</th>
                    <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">n</th>
                    <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">Media</th>
                    <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">DE</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g) => (
                    <tr key={g.name} className="border-b border-border/50 hover:bg-sidebar/60 transition-colors">
                      <td className="py-2 px-3 text-ink">{g.name}</td>
                      <td className="py-2 px-3 text-right tabular-nums text-ink-muted">{g.n}</td>
                      <td className="py-2 px-3 text-right tabular-nums text-ink font-medium">{g.mean.toFixed(3)}</td>
                      <td className="py-2 px-3 text-right tabular-nums text-ink-muted">{g.sd.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Test result */}
          <div className="bg-sidebar rounded-xl border border-border p-4 space-y-3">
            <h3 className="text-xs font-medium text-ink-muted uppercase tracking-wide">
              {test.type === 't' ? 'Prueba t de Welch (2 grupos)' : `ANOVA de un factor (${groups.length} grupos)`}
            </h3>
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-2xs text-ink-faint">
                  {test.type === 't' ? 't' : 'F'}({test.df})
                </p>
                <p className="text-lg font-semibold text-ink tabular-nums">{test.statistic.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-2xs text-ink-faint">p</p>
                <p className="text-lg font-semibold text-ink tabular-nums">{formatP(test.pValue)}</p>
              </div>
              <div>
                <p className="text-2xs text-ink-faint">{test.type === 't' ? 'd de Cohen' : 'η²'}</p>
                <p className="text-lg font-semibold text-ink tabular-nums">{test.effectSize.toFixed(3)}</p>
                <p className="text-2xs text-ink-faint">({test.effectLabel})</p>
              </div>
            </div>
            <ResultBadge sig={test.significant} />
          </div>
        </>
      )}

      {!datasetId && (
        <div className="text-center py-16 text-ink-faint text-sm">
          Selecciona un dataset, una variable dependiente y una variable de agrupación.
        </div>
      )}
    </div>
  )
}
