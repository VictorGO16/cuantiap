// Registro central de módulos pedagógicos
// Importar aquí cada módulo y agregarlo al registro

export interface AppModule {
  id: string
  name: string
  version: string
  status: 'active' | 'disabled' | 'deprecated'
  routes?: ModuleRoute[]
  navigation?: NavigationItem[]
  content?: ContentSource[]
  activities?: ActivityDefinition[]
  explorers?: ExplorerDefinition[]
  aiContexts?: AIContextProvider[]
  permissions?: PermissionDefinition[]
}

export interface ModuleRoute {
  path: string
  component: string
}

export interface NavigationItem {
  id: string
  label: string
  path: string
  moduleId: string
}

export interface ContentSource {
  id: string
  type: string
  moduleId: string
}

export interface ActivityDefinition {
  id: string
  moduleId: string
  type: string
  version: string
}

export interface ExplorerDefinition {
  id: string
  moduleId: string
  type: string
  version: string
}

export interface AIContextProvider {
  id: string
  moduleId: string
}

export interface PermissionDefinition {
  id: string
  moduleId: string
  scope: string
}

// Registro de módulos
export const moduleRegistry: AppModule[] = [
  // Módulos pedagógicos serán registrados aquí
  // - metodologiaModule
  // - medicionModule
  // - psicometriaModule
  // - estadisticaModule
  // - rQuartoModule (opcional)
  // - cursoModule (opcional)
]

// Configuración de módulos activos
export const enabledModules = {
  metodologia: true,
  medicion: true,
  psicometria: true,
  estadistica: true,
  'r-quarto': false,
  curso: false,
}
