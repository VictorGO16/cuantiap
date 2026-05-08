import { Sidebar } from '@/ui/navigation/Sidebar'
import { MobileHeader } from '@/ui/navigation/MobileHeader'
import { GlobalAIChat } from '@/ui/components/GlobalAIChat'
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
      <MobileHeader />
      <main className="lg:pl-sidebar min-h-screen pt-14 lg:pt-0">
        <div className="max-w-[900px] px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {children}
        </div>
      </main>
      <GlobalAIChat />
    </div>
  )
}
