import Link from 'next/link'

const TOOLS = [
  {
    href: '/interactivo/distribuciones',
    label: 'Explorador de distribuciones',
    unit: 'Unidad 4 — Estadística',
    description: 'Selecciona una variable continua y explora su distribución: histograma, descriptivos, filtro por grupo.',
  },
  {
    href: '/interactivo/grupos',
    label: 'Comparador de grupos',
    unit: 'Unidad 4 — Estadística',
    description: 'Compara una variable entre grupos: prueba t o ANOVA, tamaño del efecto, medias y DEs por grupo.',
  },
  {
    href: '/interactivo/psicometria',
    label: 'Analizador psicométrico',
    unit: 'Unidad 3 — Psicometría',
    description: 'Analiza la confiabilidad de un instrumento: α de Cronbach, correlación ítem-total y α si se elimina el ítem.',
  },
  {
    href: '/interactivo/variables',
    label: 'Correlación bivariada',
    unit: 'Medición · Estadística',
    description: 'Explora la relación entre dos variables continuas: diagrama de dispersión, recta de regresión y r de Pearson.',
  },
]

export default function InteractivoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink tracking-tight">Explorador de datos</h1>
        <p className="text-sm text-ink-muted mt-2 max-w-prose leading-relaxed">
          Herramientas interactivas sobre cinco datasets de psicología aplicada.
          El asistente de IA está disponible para interpretar los resultados en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-xl border border-border bg-white p-5 hover:border-accent/50 hover:shadow-sm transition-all duration-150"
          >
            <p className="text-2xs font-medium text-accent uppercase tracking-wide mb-1.5">{tool.unit}</p>
            <h2 className="text-base font-semibold text-ink group-hover:text-accent transition-colors duration-100 mb-2">
              {tool.label}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-sidebar px-5 py-4">
        <p className="text-xs font-medium text-ink mb-1">Cinco bases de datos disponibles</p>
        <p className="text-xs text-ink-muted leading-relaxed">
          Clínica · Laboral · Educacional · Social-Comunitaria · Investigación — todas con n = 520. Los datos son simulados pero estadísticamente coherentes.
        </p>
      </div>
    </div>
  )
}
