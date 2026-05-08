import { GroupComparator } from '@/ui/components/interactivo/GroupComparator'

export default function GruposPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-2xs font-medium text-accent uppercase tracking-wide mb-1">Unidad 4 — Estadística</p>
        <h1 className="text-xl font-bold text-ink tracking-tight">Comparador de grupos</h1>
        <p className="text-sm text-ink-muted mt-1.5 leading-relaxed max-w-prose">
          Compara una variable continua entre grupos. Con 2 grupos aplica prueba t de Welch; con 3 o más, ANOVA de un factor.
          Abre el tab <strong>Explorador</strong> en el asistente para interpretar los resultados.
        </p>
      </div>
      <GroupComparator />
    </div>
  )
}
