import { NextRequest, NextResponse } from 'next/server'
import { processChat } from '@/core/ai/ai-service'
import type { AIChatRequest } from '@/types/core'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as AIChatRequest

    if (!body.message?.trim()) {
      return NextResponse.json({ error: 'El mensaje no puede estar vacío.' }, { status: 400 })
    }

    const result = await processChat({
      message: body.message.trim(),
      conceptId: body.conceptId,
      moduleId: body.moduleId,
      history: body.history ?? [],
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('[AI Route] Error:', error)
    return NextResponse.json(
      { error: 'El servicio de IA no está disponible en este momento.' },
      { status: 500 }
    )
  }
}
