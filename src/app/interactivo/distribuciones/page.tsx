import { DistributionExplorer } from '@/ui/components/interactivo/DistributionExplorer'

export default function DistribucionesPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-2xs font-medium text-accent uppercase tracking-wide mb-1">Unidad 4 — Estadística</p>
        <h1 className="text-xl font-bold text-ink tracking-tight">Explorador de distribuciones</h1>
        <p className="text-sm text-ink-muted mt-1.5 leading-relaxed max-w-prose">
          Selecciona una variable continua y un filtro opcional. El asistente puede interpretar los resultados si abres el tab <strong>Explorador</strong>.
        </p>
      </div>
      <DistributionExplorer />
    </div>
  )
}
