import type { Metadata } from 'next'
import { AppLayout } from '@/ui/layouts/AppLayout'
import { ModuleIndex } from '@/ui/components/ModuleIndex'
import { Breadcrumb } from '@/ui/navigation/Breadcrumb'
import { ContextUpdater } from '@/ui/components/ContextUpdater'
import { getModule, getConceptsByModule } from '@/core/content/service'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Medición' }

export default function MedicionPage() {
  const mod = getModule('medicion')
  if (!mod) notFound()

  const concepts = getConceptsByModule('medicion')

  return (
    <AppLayout>
      <ContextUpdater />
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Medición' }]} />
      <ModuleIndex module={mod} concepts={concepts} modulePath="/medicion" />
    </AppLayout>
  )
}
