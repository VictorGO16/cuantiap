import type { Metadata } from 'next'
import { AppLayout } from '@/ui/layouts/AppLayout'
import { ConceptView } from '@/ui/components/ConceptView'
import { Breadcrumb } from '@/ui/navigation/Breadcrumb'
import { AIChat } from '@/ui/components/AIChat'
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

export default async function EstadisticaConceptPage({ params }: Props) {
  const { conceptId } = await params
  const concept = getConcept(conceptId)
  if (!concept || concept.moduleId !== 'estadistica') notFound()

  return (
    <AppLayout>
      <Breadcrumb
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Estadística', href: '/estadistica' },
          { label: concept.title },
        ]}
      />
      <ConceptView concept={concept} />
      <AIChat conceptId={concept.id} moduleId="estadistica" />
    </AppLayout>
  )
}
