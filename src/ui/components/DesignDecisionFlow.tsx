const decisionSteps = [
  {
    question: '¿Qué busca responder la pregunta?',
    options: [
      {
        condition: 'Describir frecuencia, distribución o características',
        design: 'Descriptivo transversal',
        note: 'Prioriza buena definición poblacional, muestreo y medición clara.',
      },
      {
        condition: 'Examinar asociación entre variables',
        design: 'Correlacional',
        note: 'Permite estimar relación, no causalidad.',
      },
      {
        condition: 'Anticipar un resultado futuro',
        design: 'Predictivo longitudinal',
        note: 'Mide predictores antes del resultado para establecer temporalidad.',
      },
    ],
  },
  {
    question: '¿Se quiere evaluar un efecto causal?',
    options: [
      {
        condition: 'Se puede manipular la VI y asignar al azar',
        design: 'Experimental aleatorizado',
        note: 'Es la opción más fuerte para inferencia causal.',
      },
      {
        condition: 'Se manipula o aplica una intervención, pero no hay azar',
        design: 'Cuasiexperimental',
        note: 'Requiere pretest, grupo comparable y control de amenazas.',
      },
      {
        condition: 'La VI ya ocurrió o no puede manipularse',
        design: 'Ex post facto o comparativo no experimental',
        note: 'La conclusión debe formularse como diferencia o asociación, no como efecto demostrado.',
      },
    ],
  },
  {
    question: '¿El cambio en el tiempo es parte central?',
    options: [
      {
        condition: 'No, basta una fotografía del momento',
        design: 'Transversal',
        note: 'Eficiente, pero no establece trayectoria ni precedencia temporal.',
      },
      {
        condition: 'Sí, se siguen los mismos casos',
        design: 'Longitudinal prospectivo',
        note: 'Permite estudiar cambio, estabilidad y dirección temporal.',
      },
      {
        condition: 'Sí, hay muchas mediciones antes y después de un evento',
        design: 'Serie temporal interrumpida',
        note: 'Adecuado para políticas, programas institucionales o cambios de sistema.',
      },
    ],
  },
]

export function DesignDecisionFlow() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4">
        {decisionSteps.map((step, stepIndex) => (
          <section key={step.question} className="border border-border bg-white rounded-lg overflow-hidden">
            <div className="flex items-start gap-3 bg-sidebar px-4 py-3 border-b border-border">
              <span className="w-6 h-6 rounded-full bg-ink text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                {stepIndex + 1}
              </span>
              <h3 className="text-sm font-semibold text-ink leading-6">{step.question}</h3>
            </div>
            <div className="divide-y divide-border">
              {step.options.map((option) => (
                <div
                  key={`${step.question}-${option.design}`}
                  className="grid gap-2 px-4 py-3 md:grid-cols-[minmax(0,1.1fr)_minmax(180px,0.7fr)_minmax(0,1fr)] md:items-start md:gap-4"
                >
                  <p className="text-sm text-ink leading-6">{option.condition}</p>
                  <p className="text-sm font-semibold text-accent leading-6">{option.design}</p>
                  <p className="text-xs text-ink-faint leading-5">{option.note}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="border-l-2 border-accent bg-accent-light/25 rounded-r-lg px-4 py-3">
        <p className="text-sm text-ink leading-6">
          Regla de cierre: elige el diseño por la inferencia que necesitas defender, no por
          el análisis estadístico que planeas usar. El análisis debe seguir al diseño.
        </p>
      </div>
    </div>
  )
}
