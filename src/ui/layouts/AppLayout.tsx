import { Sidebar } from '@/ui/navigation/Sidebar'
import { getAllModules, getConceptsByModule } from '@/core/content/service'
import type { Concept } from '@/types/core'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const modules = getAllModules()
  const conceptsByModule: Record<string, Concept[]> = {}
  modules.forEach((mod) => {
    conceptsByModule[mod.id] = getConceptsByModule(mod.id)
  })

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar modules={modules} conceptsByModule={conceptsByModule} />
      <main className="pl-sidebar min-h-screen">
        <div className="max-w-content mx-auto px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
