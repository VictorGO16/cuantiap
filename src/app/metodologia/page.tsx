import type { Metadata } from 'next'
import { AppLayout } from '@/ui/layouts/AppLayout'
import { ModuleIndex } from '@/ui/components/ModuleIndex'
import { Breadcrumb } from '@/ui/navigation/Breadcrumb'
import { getModule, getConceptsByModule } from '@/core/content/service'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Metodología' }

export default function MetodologiaPage() {
  const mod = getModule('metodologia')
  if (!mod) notFound()

  const concepts = getConceptsByModule('metodologia')

  return (
    <AppLayout>
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Metodología' }]} />
      <ModuleIndex module={mod} concepts={concepts} modulePath="/metodologia" />
    </AppLayout>
  )
}
