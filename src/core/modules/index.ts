import type { AppModule } from '@/types/core'

export const enabledModules = {
  metodologia: true,
  medicion: true,
  psicometria: true,
  estadistica: true,
  'r-quarto': false,
  curso: false,
}

// El registry de AppModule se usa para capacidades adicionales (rutas, IA, actividades).
// El contenido se gestiona mediante core/content/registry.ts.
export const moduleRegistry: AppModule[] = [
  {
    id: 'metodologia',
    name: 'Metodología',
    version: '1.0.0',
    status: 'active',
  },
  {
    id: 'medicion',
    name: 'Medición',
    version: '1.0.0',
    status: 'active',
  },
  {
    id: 'psicometria',
    name: 'Psicometría',
    version: '1.0.0',
    status: 'active',
  },
  {
    id: 'estadistica',
    name: 'Estadística',
    version: '1.0.0',
    status: 'active',
  },
]
