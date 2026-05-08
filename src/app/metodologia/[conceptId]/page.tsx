import type { Metadata } from 'next'
import { AppLayout } from '@/ui/layouts/AppLayout'
import { ConceptView } from '@/ui/components/ConceptView'
import { Breadcrumb } from '@/ui/navigation/Breadcrumb'
import { ContextUpdater } from '@/ui/components/ContextUpdater'
import { getConcept } from '@/core/content/service'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ conceptId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { conceptId } = await params
  const concept = getConcept(conceptId)
  return { title: concept?.title ?? 'Concepto' }
}

export default async function MetodologiaConceptPage({ params }: Props) {
  const { conceptId } = await params
  const concept = getConcept(conceptId)
  if (!concept || concept.moduleId !== 'metodologia') notFound()

  return (
    <AppLayout>
      <ContextUpdater conceptId={concept.id} conceptTitle={concept.title} />
      <Breadcrumb
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Metodología', href: '/metodologia' },
          { label: concept.title },
        ]}
      />
      <ConceptView concept={concept} />
    </AppLayout>
  )
}
