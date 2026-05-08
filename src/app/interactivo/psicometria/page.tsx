import { PsychometricAnalyzer } from '@/ui/components/interactivo/PsychometricAnalyzer'

export default function PsicometriaPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-2xs font-medium text-accent uppercase tracking-wide mb-1">Unidad 3 — Psicometría</p>
        <h1 className="text-xl font-bold text-ink tracking-tight">Analizador psicométrico</h1>
        <p className="text-sm text-ink-muted mt-1.5 leading-relaxed max-w-prose">
          Selecciona un instrumento y analiza su confiabilidad: α de Cronbach, correlación ítem-total y α si se elimina cada ítem.
          Analiza la confiabilidad tal como se reporta en investigación psicométrica aplicada.
        </p>
      </div>
      <PsychometricAnalyzer />
    </div>
  )
}
