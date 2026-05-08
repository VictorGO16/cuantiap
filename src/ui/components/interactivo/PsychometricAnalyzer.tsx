'use client'

import { useState, useEffect, useMemo } from 'react'
import { DATASETS } from '@/modules/interactivo/datasets'
import { useDataset, getItemMatrix } from './useDataset'
import { cronbachAlpha, analyzeItems, ItemAnalysis } from './stats'
import { useAIChatStore } from '@/store/ai-chat'
import type { AnalysisContext, InstrumentResult } from '@/types/core'

function AlphaBadge({ alpha }: { alpha: number }) {
  const level = alpha >= 0.9 ? 'Excelente' : alpha >= 0.8 ? 'Buena' : alpha >= 0.7 ? 'Aceptable' : alpha >= 0.6 ? 'Cuestionable' : 'Inaceptable'
  const color = alpha >= 0.8 ? 'text-green-700 bg-green-50 border-green-200' : alpha >= 0.7 ? 'text-yellow-700 bg-yellow-50 border-yellow-200' : 'text-red-700 bg-red-50 border-red-200'
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded border ${color}`}>{level}</span>
  )
}

function ItemRow({ item, baseAlpha }: { item: ItemAnalysis; baseAlpha: number }) {
  const hurts = item.alphaIfDeleted > baseAlpha + 0.01
  return (
    <tr className="border-b border-border/50 hover:bg-sidebar/50 transition-colors">
      <td className="py-2 px-3 font-mono text-xs text-ink-muted">{item.id}</td>
      <td className="py-2 px-3 text-right tabular-nums text-sm text-ink">{item.mean.toFixed(2)}</td>
      <td className="py-2 px-3 text-right tabular-nums text-sm text-ink-muted">{item.sd.toFixed(2)}</td>
      <td className={`py-2 px-3 text-right tabular-nums text-sm font-medium ${item.itemTotal < 0.3 ? 'text-red-600' : 'text-ink'}`}>
        {item.itemTotal.toFixed(3)}
      </td>
      <td className="py-2 px-3 text-right tabular-nums text-sm">
        <span className={hurts ? 'text-amber-600 font-medium' : 'text-ink-muted'}>
          {item.alphaIfDeleted.toFixed(3)}
          {hurts && <span className="ml-1 text-2xs">↑</span>}
        </span>
      </td>
    </tr>
  )
}

export function PsychometricAnalyzer() {
  const [datasetId, setDatasetId] = useState('')
  const [instrumentId, setInstrumentId] = useState('')
  const [subscaleId, setSubscaleId] = useState('__full__')

  const meta = DATASETS.find((d) => d.id === datasetId)
  const instrument = meta?.instruments.find((i) => i.id === instrumentId)
  const { data, loading } = useDataset(meta?.filename ?? null)
  const setDataContext = useAIChatStore((s) => s.setDataContext)
  const clearDataContext = useAIChatStore((s) => s.clearDataContext)

  useEffect(() => { setInstrumentId(''); setSubscaleId('__full__') }, [datasetId])
  useEffect(() => { setSubscaleId('__full__') }, [instrumentId])

  const activeItems = useMemo(() => {
    if (!instrument) return []
    if (subscaleId === '__full__') return instrument.items
    return instrument.subscales.find((s) => s.id === subscaleId)?.items ?? []
  }, [instrument, subscaleId])

  const matrix = useMemo(() => {
    if (!data.length || !activeItems.length) return []
    return getItemMatrix(data, activeItems)
  }, [data, activeItems])

  const alpha = useMemo(() => {
    if (matrix.length < 2 || activeItems.length < 2) return NaN
    return cronbachAlpha(matrix)
  }, [matrix, activeItems])

  const items = useMemo((): ItemAnalysis[] => {
    if (matrix.length < 2 || activeItems.length < 2) return []
    return analyzeItems(matrix, activeItems)
  }, [matrix, activeItems])

  const subscaleLabel = subscaleId === '__full__'
    ? 'Escala completa'
    : instrument?.subscales.find((s) => s.id === subscaleId)?.label ?? subscaleId

  useEffect(() => {
    if (!instrument || !meta || isNaN(alpha) || !items.length) { clearDataContext(); return }
    const result: InstrumentResult = {
      name: instrument.label,
      sigla: instrument.sigla,
      nItems: activeItems.length,
      alpha: parseFloat(alpha.toFixed(3)),
      items: items.map((item) => ({
        id: item.id,
        label: item.id,
        mean: item.mean,
        sd: item.sd,
        itemTotal: item.itemTotal,
        alphaIfDeleted: item.alphaIfDeleted,
      })),
    }
    const ctx: AnalysisContext = {
      tool: 'psicometria',
      datasetId: meta.id,
      datasetLabel: meta.label,
      instrumentId: instrument.id,
      instrumentLabel: `${instrument.label} — ${subscaleLabel}`,
      results: { instrument: result },
    }
    setDataContext(ctx)
    return () => clearDataContext()
  }, [instrument, meta, alpha, items, activeItems, subscaleLabel, setDataContext, clearDataContext])

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
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Instrumento</label>
          <select
            value={instrumentId}
            onChange={(e) => setInstrumentId(e.target.value)}
            disabled={!meta}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent disabled:text-ink-faint disabled:bg-sidebar"
          >
            <option value="">— Seleccionar —</option>
            {meta?.instruments.map((i) => (
              <option key={i.id} value={i.id}>{i.sigla} — {i.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">Subescala</label>
          <select
            value={subscaleId}
            onChange={(e) => setSubscaleId(e.target.value)}
            disabled={!instrument}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:ring-1 focus:ring-accent disabled:text-ink-faint disabled:bg-sidebar"
          >
            <option value="__full__">Escala completa ({instrument?.items.length ?? '—'} ítems)</option>
            {instrument?.subscales.map((s) => (
              <option key={s.id} value={s.id}>{s.label} ({s.items.length} ítems)</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-sm text-ink-faint">Cargando datos...</p>}

      {!isNaN(alpha) && items.length > 0 && (
        <>
          {/* Alpha summary */}
          <div className="bg-sidebar rounded-xl border border-border p-4 flex items-center gap-6">
            <div>
              <p className="text-2xs text-ink-faint uppercase tracking-wide mb-0.5">α de Cronbach</p>
              <p className="text-3xl font-bold text-ink tabular-nums">{alpha.toFixed(3)}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <AlphaBadge alpha={alpha} />
              <p className="text-xs text-ink-muted">
                {instrument?.label} — {subscaleLabel} ({activeItems.length} ítems, n={matrix.length})
              </p>
            </div>
          </div>

          {/* Item table */}
          <div>
            <h3 className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">
              Análisis por ítem
            </h3>
            <p className="text-2xs text-ink-faint mb-3">
              Correlación ítem-total corregida: valores &lt; .30 pueden indicar ítems problemáticos.
              La flecha ↑ señala ítems que aumentarían α si se eliminan.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">Ítem</th>
                    <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">M</th>
                    <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">DE</th>
                    <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">r ítem-total</th>
                    <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">α si elimina</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <ItemRow key={item.id} item={item} baseAlpha={alpha} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!datasetId && (
        <div className="text-center py-16 text-ink-faint text-sm">
          Selecciona un dataset e instrumento para ver el análisis de confiabilidad.
        </div>
      )}
    </div>
  )
}
