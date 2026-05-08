'use client'

import { useState, useEffect, useRef } from 'react'
import Papa from 'papaparse'

export type RawRow = Record<string, string>

interface State {
  data: RawRow[]
  loading: boolean
  error: string | null
}

const cache: Record<string, RawRow[]> = {}

export function useDataset(filename: string | null) {
  const [state, setState] = useState<State>({ data: [], loading: false, error: null })
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!filename) {
      setState({ data: [], loading: false, error: null })
      return
    }
    if (cache[filename]) {
      setState({ data: cache[filename], loading: false, error: null })
      return
    }
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setState({ data: [], loading: true, error: null })

    fetch(`/data/${filename}`, { signal: controller.signal })
      .then((r) => r.text())
      .then((text) => {
        const result = Papa.parse<RawRow>(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false,
        })
        cache[filename] = result.data
        setState({ data: result.data, loading: false, error: null })
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState({ data: [], loading: false, error: 'No se pudo cargar el dataset.' })
      })

    return () => controller.abort()
  }, [filename])

  return state
}

export function getNumericColumn(data: RawRow[], col: string): number[] {
  return data
    .map((row) => parseFloat(row[col]))
    .filter((v) => !isNaN(v))
}

export function getCategoricalColumn(data: RawRow[], col: string): string[] {
  return data.map((row) => row[col]).filter(Boolean)
}

export function filterByCategory(data: RawRow[], col: string, val: string): RawRow[] {
  if (!val) return data
  return data.filter((row) => row[col] === val)
}

export function groupByCategory(
  data: RawRow[],
  groupCol: string,
  valueCol: string
): Record<string, number[]> {
  const groups: Record<string, number[]> = {}
  for (const row of data) {
    const g = row[groupCol]
    const v = parseFloat(row[valueCol])
    if (!g || isNaN(v)) continue
    if (!groups[g]) groups[g] = []
    groups[g].push(v)
  }
  return groups
}

export function getItemMatrix(data: RawRow[], itemIds: string[]): number[][] {
  return data.map((row) =>
    itemIds.map((id) => parseFloat(row[id]))
  ).filter((row) => row.every((v) => !isNaN(v)))
}
