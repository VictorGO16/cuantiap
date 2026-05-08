interface ConceptSectionProps {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'muted'
}

export function ConceptSection({ title, children, variant = 'default' }: ConceptSectionProps) {
  return (
    <section className={`mb-8 ${variant === 'muted' ? 'opacity-90' : ''}`}>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-3">
        {title}
      </h3>
      <div className="text-sm text-ink leading-relaxed">{children}</div>
    </section>
  )
}
