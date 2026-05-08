import type { Metadata } from 'next'
import { AppLayout } from '@/ui/layouts/AppLayout'
import { ModuleIndex } from '@/ui/components/ModuleIndex'
import { Breadcrumb } from '@/ui/navigation/Breadcrumb'
import { ContextUpdater } from '@/ui/components/ContextUpdater'
import { getModule, getConceptsByModule } from '@/core/content/service'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Estadística' }

export default function EstadisticaPage() {
  const mod = getModule('estadistica')
  if (!mod) notFound()

  const concepts = getConceptsByModule('estadistica')

  return (
    <AppLayout>
      <ContextUpdater />
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Estadística' }]} />
      <ModuleIndex module={mod} concepts={concepts} modulePath="/estadistica" />
    </AppLayout>
  )
}
