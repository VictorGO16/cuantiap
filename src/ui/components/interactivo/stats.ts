// Statistical utilities for the interactive module.
// Implements distributions from scratch to avoid heavy dependencies.

// ─── Distribution functions ───────────────────────────────────────────────────

function logGamma(x: number): number {
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x)
  x -= 1
  const g = 7
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ]
  let a = c[0]
  const t = x + g + 0.5
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i)
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a)
}

function logBeta(a: number, b: number): number {
  return logGamma(a) + logGamma(b) - logGamma(a + b)
}

function betaCF(x: number, a: number, b: number): number {
  const maxIter = 300
  const eps = 3e-10
  let c = 1, d = 1 - (a + b) * x / (a + 1)
  if (Math.abs(d) < 1e-30) d = 1e-30
  d = 1 / d
  let h = d
  for (let m = 1; m <= maxIter; m++) {
    let aa = m * (b - m) * x / ((a + 2 * m - 1) * (a + 2 * m))
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30
    c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30
    d = 1 / d; h *= d * c
    aa = -(a + m) * (a + b + m) * x / ((a + 2 * m) * (a + 2 * m + 1))
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30
    c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < eps) break
  }
  return h
}

function regBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0
  if (x >= 1) return 1
  const bt = Math.exp(a * Math.log(x) + b * Math.log(1 - x) - logBeta(a, b))
  if (x < (a + 1) / (a + b + 2)) return bt * betaCF(x, a, b) / a
  return 1 - bt * betaCF(1 - x, b, a) / b
}

// Two-tailed p-value for t-distribution
export function tPValue(t: number, df: number): number {
  const x = df / (df + t * t)
  return regBeta(x, df / 2, 0.5)
}

// Upper-tail p-value for F-distribution
export function fPValue(f: number, d1: number, d2: number): number {
  const x = d2 / (d2 + d1 * f)
  return regBeta(x, d2 / 2, d1 / 2)
}

// ─── Descriptive statistics ───────────────────────────────────────────────────

export function mean(arr: number[]): number {
  return arr.reduce((s, v) => s + v, 0) / arr.length
}

export function variance(arr: number[], m?: number): number {
  const mu = m ?? mean(arr)
  return arr.reduce((s, v) => s + (v - mu) ** 2, 0) / (arr.length - 1)
}

export function sd(arr: number[]): number {
  return Math.sqrt(variance(arr))
}

export function median(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2
}

export function skewness(arr: number[]): number {
  const n = arr.length
  const mu = mean(arr)
  const s = sd(arr)
  const g1 = arr.reduce((sum, v) => sum + ((v - mu) / s) ** 3, 0)
  return (g1 * n) / ((n - 1) * (n - 2))
}

export function kurtosis(arr: number[]): number {
  const n = arr.length
  const mu = mean(arr)
  const s = sd(arr)
  const g2 = arr.reduce((sum, v) => sum + ((v - mu) / s) ** 4, 0)
  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * g2 -
    (3 * (n - 1) ** 2) / ((n - 2) * (n - 3))
}

export function pearsonR(x: number[], y: number[]): number {
  const mx = mean(x), my = mean(y)
  const num = x.reduce((s, xi, i) => s + (xi - mx) * (y[i] - my), 0)
  const den = Math.sqrt(
    x.reduce((s, xi) => s + (xi - mx) ** 2, 0) *
    y.reduce((s, yi) => s + (yi - my) ** 2, 0)
  )
  return den === 0 ? 0 : num / den
}

export interface HistBin { x0: number; x1: number; label: string; count: number }

export function histogram(arr: number[], nBins = 20): HistBin[] {
  const min = Math.min(...arr), max = Math.max(...arr)
  const w = (max - min) / nBins
  const bins: HistBin[] = Array.from({ length: nBins }, (_, i) => ({
    x0: min + i * w,
    x1: min + (i + 1) * w,
    label: (min + (i + 0.5) * w).toFixed(2),
    count: 0,
  }))
  for (const v of arr) {
    const idx = Math.min(Math.floor((v - min) / w), nBins - 1)
    bins[idx].count++
  }
  return bins
}

// ─── Inferential statistics ───────────────────────────────────────────────────

export interface TTestResult {
  t: number
  df: number
  pValue: number
  cohenD: number
  significant: boolean
}

export function welchTTest(a: number[], b: number[]): TTestResult {
  const ma = mean(a), mb = mean(b)
  const va = variance(a), vb = variance(b)
  const na = a.length, nb = b.length
  const se = Math.sqrt(va / na + vb / nb)
  const t = (ma - mb) / se
  const df = (va / na + vb / nb) ** 2 /
    ((va / na) ** 2 / (na - 1) + (vb / nb) ** 2 / (nb - 1))
  const pValue = tPValue(Math.abs(t), df)
  const sdPooled = Math.sqrt(((na - 1) * va + (nb - 1) * vb) / (na + nb - 2))
  const cohenD = Math.abs(ma - mb) / sdPooled
  return { t, df: Math.round(df), pValue, cohenD, significant: pValue < 0.05 }
}

export interface AnovaResult {
  F: number
  df1: number
  df2: number
  pValue: number
  etaSq: number
  significant: boolean
}

export function oneWayAnova(groups: number[][]): AnovaResult {
  const k = groups.length
  const allVals = groups.flat()
  const N = allVals.length
  const grandMean = mean(allVals)

  const SSB = groups.reduce((s, g) => s + g.length * (mean(g) - grandMean) ** 2, 0)
  const SSW = groups.reduce((s, g) => {
    const mg = mean(g)
    return s + g.reduce((ss, v) => ss + (v - mg) ** 2, 0)
  }, 0)

  const df1 = k - 1, df2 = N - k
  const MSB = SSB / df1, MSW = SSW / df2
  const F = MSB / MSW
  const pValue = fPValue(F, df1, df2)
  const etaSq = SSB / (SSB + SSW)

  return { F, df1, df2, pValue, etaSq, significant: pValue < 0.05 }
}

export function formatP(p: number): string {
  if (p < 0.001) return '< .001'
  if (p < 0.01) return '< .01'
  if (p < 0.05) return '< .05'
  return p.toFixed(3).replace('0.', '.')
}

export function cohenDLabel(d: number): string {
  if (d < 0.2) return 'trivial'
  if (d < 0.5) return 'pequeño'
  if (d < 0.8) return 'mediano'
  return 'grande'
}

export function etaSqLabel(eta: number): string {
  if (eta < 0.01) return 'trivial'
  if (eta < 0.06) return 'pequeño'
  if (eta < 0.14) return 'mediano'
  return 'grande'
}

// ─── Psychometrics ────────────────────────────────────────────────────────────

export function cronbachAlpha(matrix: number[][]): number {
  // matrix[i][j] = score of participant i on item j
  const k = matrix[0]?.length ?? 0
  if (k < 2) return NaN
  const itemVars = Array.from({ length: k }, (_, j) =>
    variance(matrix.map((row) => row[j]))
  )
  const totalVar = variance(matrix.map((row) => row.reduce((s, v) => s + v, 0)))
  const sumItemVars = itemVars.reduce((s, v) => s + v, 0)
  return (k / (k - 1)) * (1 - sumItemVars / totalVar)
}

export interface ItemAnalysis {
  id: string
  mean: number
  sd: number
  itemTotal: number
  alphaIfDeleted: number
}

export function analyzeItems(matrix: number[][], ids: string[]): ItemAnalysis[] {
  const k = ids.length
  return ids.map((id, j) => {
    const itemScores = matrix.map((row) => row[j])
    const restScores = matrix.map((row) =>
      row.reduce((s, v, jj) => (jj !== j ? s + v : s), 0)
    )
    const r = pearsonR(itemScores, restScores)
    const subMatrix = matrix.map((row) => row.filter((_, jj) => jj !== j))
    const alpha = cronbachAlpha(subMatrix)
    return {
      id,
      mean: parseFloat(mean(itemScores).toFixed(3)),
      sd: parseFloat(sd(itemScores).toFixed(3)),
      itemTotal: parseFloat(r.toFixed(3)),
      alphaIfDeleted: parseFloat(alpha.toFixed(3)),
    }
  })
}
