export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Metodología Cuantitativa
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Aplicación pedagógica para aprender metodología cuantitativa, medición, psicometría y estadística aplicada.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Estructura Base</h2>
            <p className="text-slate-600 text-sm">
              Núcleo pedagógico independiente con módulos pedagógicos (metodología, medición, psicometría, estadística) y módulos opcionales (curso, R/Quarto).
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Contenido Completo</h2>
            <p className="text-slate-600 text-sm">
              Cada concepto incluye definición, explicación, ejemplos, actividades, exploradores interactivos, retroalimentación y criterios de dominio.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">IA Contextualizada</h2>
            <p className="text-slate-600 text-sm">
              Gemini integrado como servicio interno, usando contexto curado de los contenidos. No reemplaza el contenido validado.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Interacción Aplicada</h2>
            <p className="text-slate-600 text-sm">
              Exploradores interactivos que permiten manipular datos, supuestos y variables para observar cambios en resultados.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-blue-900">Próximos Pasos</h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>Desarrollar contenido de los módulos pedagógicos</li>
            <li>Implementar actividades y evaluación</li>
            <li>Crear exploradores interactivos</li>
            <li>Integrar IA con contexto curado</li>
            <li>Configurar persistencia con Supabase (opcional)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
