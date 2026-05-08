import { CorrelationExplorer } from '@/ui/components/interactivo/CorrelationExplorer'

export default function VariablesPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-2xs font-medium text-accent uppercase tracking-wide mb-1">Medición · Estadística</p>
        <h1 className="text-xl font-bold text-ink tracking-tight">Correlación bivariada</h1>
        <p className="text-sm text-ink-muted mt-1.5 leading-relaxed max-w-prose">
          Explora la relación entre dos variables continuas. Selecciona X e Y para ver el diagrama de dispersión,
          la recta de regresión y los estadísticos de correlación. Abre el tab <strong>Explorador</strong> en el asistente para interpretar los resultados.
        </p>
      </div>
      <CorrelationExplorer />
    </div>
  )
}
