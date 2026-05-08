import type { Metadata } from 'next'
import { AppLayout } from '@/ui/layouts/AppLayout'
import { ModuleIndex } from '@/ui/components/ModuleIndex'
import { Breadcrumb } from '@/ui/navigation/Breadcrumb'
import { ContextUpdater } from '@/ui/components/ContextUpdater'
import { getModule, getConceptsByModule } from '@/core/content/service'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Psicometría' }

export default function PsicometriaPage() {
  const mod = getModule('psicometria')
  if (!mod) notFound()

  const concepts = getConceptsByModule('psicometria')

  return (
    <AppLayout>
      <ContextUpdater />
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Psicometría' }]} />
      <ModuleIndex module={mod} concepts={concepts} modulePath="/psicometria" />
    </AppLayout>
  )
}
