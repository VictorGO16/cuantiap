import React from 'react'

// Inline renderer: handles **bold** and *italic*
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>
    }
    return part
  })
}

// Table renderer
function renderTable(block: string) {
  const rows = block.trim().split('\n').filter((r) => r.trim())
  const header = rows[0]
  const separator = rows[1]
  const body = rows.slice(2)

  if (!separator?.match(/^\|[-| :]+\|$/)) return null

  const parseRow = (row: string) =>
    row.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1).map((c) => c.trim())

  const headerCells = parseRow(header)
  const bodyCells = body.map(parseRow)

  return (
    <div className="overflow-x-auto my-5 rounded-lg border border-border">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-sidebar">
            {headerCells.map((cell, i) => (
              <th
                key={i}
                className="text-left text-xs font-semibold text-ink-muted px-4 py-2.5 border-b border-border"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyCells.map((row, ri) => (
            <tr key={ri} className="border-b border-border last:border-0 hover:bg-sidebar/50 transition-colors">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-2.5 text-sm ${ci === 0 ? 'text-ink font-medium' : 'text-ink-muted'}`}
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Detect if block is a markdown table
function isTable(block: string): boolean {
  const lines = block.trim().split('\n')
  return lines.length >= 2 && lines[0].trim().startsWith('|') && lines[1]?.match(/^\|[-| :]+\|$/) !== null
}

// Detect if block is a standalone heading (**text** or **text:**)
function isHeading(block: string): boolean {
  return /^\*\*[^*]+\*\*[:\s]*$/.test(block.trim())
}

// Detect if block starts with **term**: followed by description
function startsWithBoldTerm(block: string): boolean {
  return /^\*\*[^*]+\*\*:/.test(block.trim())
}

// Detect if block starts with *italic label*: description
function startsWithItalicTerm(block: string): boolean {
  return /^\*[^*]+\*:/.test(block.trim())
}

function renderBlock(block: string, index: number): React.ReactNode {
  const trimmed = block.trim()
  if (!trimmed) return null

  // Table
  if (isTable(trimmed)) {
    return <React.Fragment key={index}>{renderTable(trimmed)}</React.Fragment>
  }

  // Standalone heading: **text** or **text:**
  if (isHeading(trimmed)) {
    const text = trimmed.replace(/^\*\*/, '').replace(/\*\*:?\s*$/, '')
    return (
      <h4 key={index} className="text-sm font-semibold text-ink mt-6 mb-2 first:mt-0">
        {text}
      </h4>
    )
  }

  // Paragraph starting with **bold term**: description
  if (startsWithBoldTerm(trimmed)) {
    const match = trimmed.match(/^(\*\*[^*]+\*\*:?\s*)(.*)$/s)
    if (match) {
      const term = match[1].replace(/\*\*/g, '').replace(/:$/, '').trim()
      const rest = match[2].trim()
      return (
        <div key={index} className="mb-4">
          <span className="text-sm font-semibold text-ink">{term}:</span>{' '}
          {rest && <span className="text-sm text-ink leading-7">{renderInline(rest)}</span>}
        </div>
      )
    }
  }

  // Paragraph starting with *italic label*: description
  if (startsWithItalicTerm(trimmed)) {
    return (
      <p key={index} className="text-sm text-ink leading-7 mb-3 pl-3 border-l border-border">
        {renderInline(trimmed)}
      </p>
    )
  }

  // Regular paragraph
  return (
    <p key={index} className="text-sm text-ink leading-7 mb-4 last:mb-0">
      {renderInline(trimmed)}
    </p>
  )
}

interface ExplanationRendererProps {
  text: string
}

export function ExplanationRenderer({ text }: ExplanationRendererProps) {
  const blocks = text.split('\n\n')

  return (
    <div className="explanation-prose">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  )
}
