export interface Subscale {
  id: string
  label: string
  items: string[]
}

export interface Instrument {
  id: string
  sigla: string
  label: string
  items: string[]
  subscales: Subscale[]
}

export interface ContinuousVar {
  id: string
  label: string
}

export interface CategoricalVar {
  id: string
  label: string
  values: string[]
}

export interface DatasetMeta {
  id: string
  filename: string
  label: string
  description: string
  n: number
  color: string
  continuousVars: ContinuousVar[]
  categoricalVars: CategoricalVar[]
  instruments: Instrument[]
}

function items(prefix: string, from: number, to: number): string[] {
  return Array.from({ length: to - from + 1 }, (_, i) =>
    `${prefix}_i${String(from + i).padStart(2, '0')}`
  )
}

export const DATASETS: DatasetMeta[] = [
  {
    id: 'clinica',
    filename: 'bd_clinica.csv',
    label: 'Clínica',
    description: 'COSAM Metropolitano — 520 usuarios/as en tratamiento psicológico',
    n: 520,
    color: '#27ae60',
    continuousVars: [
      { id: 'nivel_funcionalidad_gaf', label: 'Funcionalidad global (GAF)' },
      { id: 'esa_fisica', label: 'ESA — Ansiedad física' },
      { id: 'esa_cognitiva', label: 'ESA — Ansiedad cognitiva' },
      { id: 'esa_total', label: 'ESA — Total ansiedad' },
      { id: 'ebp_emocional', label: 'EBP — Bienestar emocional' },
      { id: 'ebp_relaciones', label: 'EBP — Relaciones positivas' },
      { id: 'ebp_proposito', label: 'EBP — Propósito de vida' },
      { id: 'ebp_total', label: 'EBP — Total bienestar' },
      { id: 'ere_reevaluacion', label: 'ERE — Reevaluación cognitiva' },
      { id: 'ere_supresion', label: 'ERE — Supresión expresiva' },
      { id: 'ere_total', label: 'ERE — Total regulación emocional' },
      { id: 'iaf_activo', label: 'IAF — Afrontamiento activo' },
      { id: 'iaf_evitacion', label: 'IAF — Evitación' },
      { id: 'iaf_total', label: 'IAF — Total afrontamiento' },
    ],
    categoricalVars: [
      { id: 'sexo', label: 'Sexo', values: ['Mujer', 'Hombre', 'Otro'] },
      { id: 'nivel_educacional', label: 'Nivel educacional', values: ['Básica', 'Media', 'Técnico', 'Universitario'] },
      { id: 'zona', label: 'Zona', values: ['Urbano', 'Rural'] },
      { id: 'tipo_servicio', label: 'Tipo de servicio', values: ['Ambulatorio', 'Urgencia', 'Hospital día'] },
      { id: 'diagnostico_gral', label: 'Diagnóstico general', values: ['Ansiedad', 'Depresión', 'Adaptación', 'Mixto', 'Otro'] },
      { id: 'adherencia', label: 'Adherencia al tratamiento', values: ['Alta', 'Media', 'Baja'] },
      { id: 'red_apoyo', label: 'Red de apoyo', values: ['Sí', 'Parcial', 'No'] },
      { id: 'farmacoterapia', label: 'Farmacoterapia', values: ['Sí', 'No'] },
      { id: 'hospitalizacion_previa', label: 'Hospitalización previa', values: ['Sí', 'No'] },
    ],
    instruments: [
      {
        id: 'esa', sigla: 'ESA', label: 'Escala de Síntomas de Ansiedad',
        items: items('esa', 1, 15),
        subscales: [
          { id: 'esa_fisica', label: 'Ansiedad física', items: items('esa', 1, 7) },
          { id: 'esa_cognitiva', label: 'Ansiedad cognitiva', items: items('esa', 8, 15) },
        ],
      },
      {
        id: 'ebp', sigla: 'EBP', label: 'Escala de Bienestar Psicológico',
        items: items('ebp', 1, 18),
        subscales: [
          { id: 'ebp_emocional', label: 'Bienestar emocional', items: items('ebp', 1, 6) },
          { id: 'ebp_relaciones', label: 'Relaciones positivas', items: items('ebp', 7, 12) },
          { id: 'ebp_proposito', label: 'Propósito de vida', items: items('ebp', 13, 18) },
        ],
      },
      {
        id: 'ere', sigla: 'ERE', label: 'Escala de Regulación Emocional',
        items: items('ere', 1, 12),
        subscales: [
          { id: 'ere_reevaluacion', label: 'Reevaluación cognitiva', items: items('ere', 1, 6) },
          { id: 'ere_supresion', label: 'Supresión expresiva', items: items('ere', 7, 12) },
        ],
      },
      {
        id: 'iaf', sigla: 'IAF', label: 'Inventario de Afrontamiento',
        items: items('iaf', 1, 16),
        subscales: [
          { id: 'iaf_activo', label: 'Afrontamiento activo', items: items('iaf', 1, 7) },
          { id: 'iaf_evitacion', label: 'Evitación', items: items('iaf', 8, 16) },
        ],
      },
    ],
  },

  {
    id: 'laboral',
    filename: 'bd_laboral.csv',
    label: 'Laboral',
    description: 'Empresa multinacional — 520 trabajadores/as del sector servicios',
    n: 520,
    color: '#2980b9',
    continuousVars: [
      { id: 'antiguedad_anos', label: 'Antigüedad en la empresa (años)' },
      { id: 'horas_semanales', label: 'Horas de trabajo semanales' },
      { id: 'evaluacion_desempeno', label: 'Evaluación de desempeño (1–5)' },
      { id: 'ebl_agotamiento', label: 'EBL — Agotamiento emocional' },
      { id: 'ebl_cinismo', label: 'EBL — Cinismo' },
      { id: 'ebl_baja_eficacia', label: 'EBL — Baja eficacia percibida' },
      { id: 'ebl_total', label: 'EBL — Total burnout' },
      { id: 'csl_tarea', label: 'CSL — Satisfacción con la tarea' },
      { id: 'csl_contexto', label: 'CSL — Satisfacción con el contexto' },
      { id: 'csl_total', label: 'CSL — Total satisfacción laboral' },
      { id: 'elp_transformacional', label: 'ELP — Liderazgo transformacional' },
      { id: 'elp_transaccional', label: 'ELP — Liderazgo transaccional' },
      { id: 'elp_total', label: 'ELP — Total liderazgo percibido' },
      { id: 'eir_intencion_salida', label: 'EIR — Intención de salida' },
      { id: 'eir_busqueda_alternativas', label: 'EIR — Búsqueda de alternativas' },
      { id: 'eir_total', label: 'EIR — Total intención de rotación' },
    ],
    categoricalVars: [
      { id: 'sexo', label: 'Sexo', values: ['Mujer', 'Hombre', 'Otro'] },
      { id: 'nivel_educacional', label: 'Nivel educacional', values: ['Media', 'Técnico', 'Universitario', 'Postgrado'] },
      { id: 'area', label: 'Área de la empresa', values: ['RRHH', 'Comercial', 'Operaciones', 'TI', 'Finanzas', 'Producción'] },
      { id: 'nivel_cargo', label: 'Nivel de cargo', values: ['Operativo', 'Profesional', 'Jefatura', 'Gerencia'] },
      { id: 'modalidad_trabajo', label: 'Modalidad de trabajo', values: ['Presencial', 'Híbrido', 'Remoto'] },
      { id: 'tipo_contrato', label: 'Tipo de contrato', values: ['Indefinido', 'Plazo fijo', 'Honorarios'] },
      { id: 'ingreso_tramo', label: 'Tramo de ingreso', values: ['Bajo', 'Medio', 'Alto'] },
      { id: 'capacitacion_ultimo_ano', label: 'Capacitación último año', values: ['Sí', 'No'] },
      { id: 'turno', label: 'Tipo de turno', values: ['Diurno', 'Nocturno', 'Rotativo'] },
    ],
    instruments: [
      {
        id: 'ebl', sigla: 'EBL', label: 'Escala de Burnout Laboral',
        items: items('ebl', 1, 18),
        subscales: [
          { id: 'ebl_agotamiento', label: 'Agotamiento emocional', items: items('ebl', 1, 6) },
          { id: 'ebl_cinismo', label: 'Cinismo', items: items('ebl', 7, 12) },
          { id: 'ebl_baja_eficacia', label: 'Baja eficacia percibida', items: items('ebl', 13, 18) },
        ],
      },
      {
        id: 'csl', sigla: 'CSL', label: 'Cuestionario de Satisfacción Laboral',
        items: items('csl', 1, 16),
        subscales: [
          { id: 'csl_tarea', label: 'Satisfacción con la tarea', items: items('csl', 1, 8) },
          { id: 'csl_contexto', label: 'Satisfacción con el contexto', items: items('csl', 9, 16) },
        ],
      },
      {
        id: 'elp', sigla: 'ELP', label: 'Escala de Liderazgo Percibido',
        items: items('elp', 1, 14),
        subscales: [
          { id: 'elp_transformacional', label: 'Liderazgo transformacional', items: items('elp', 1, 7) },
          { id: 'elp_transaccional', label: 'Liderazgo transaccional', items: items('elp', 8, 14) },
        ],
      },
      {
        id: 'eir', sigla: 'EIR', label: 'Escala de Intención de Rotación',
        items: items('eir', 1, 10),
        subscales: [
          { id: 'eir_intencion_salida', label: 'Intención de salida', items: items('eir', 1, 5) },
          { id: 'eir_busqueda_alternativas', label: 'Búsqueda de alternativas', items: items('eir', 6, 10) },
        ],
      },
    ],
  },

  {
    id: 'educacional',
    filename: 'bd_educacional.csv',
    label: 'Educacional',
    description: '15 liceos de la RM — 520 estudiantes de enseñanza media',
    n: 520,
    color: '#d35400',
    continuousVars: [
      { id: 'rendimiento_promedio', label: 'Promedio general (1.0–7.0)' },
      { id: 'rendimiento_matematicas', label: 'Promedio en Matemáticas' },
      { id: 'rendimiento_lenguaje', label: 'Promedio en Lenguaje' },
      { id: 'ema_intrinseca', label: 'EMA — Motivación intrínseca' },
      { id: 'ema_extrinseca', label: 'EMA — Motivación extrínseca' },
      { id: 'ema_desmotivacion', label: 'EMA — Desmotivación' },
      { id: 'ema_total', label: 'EMA — Total motivación' },
      { id: 'eaa_tareas', label: 'EAA — Autoeficacia en tareas' },
      { id: 'eaa_social', label: 'EAA — Autoeficacia social' },
      { id: 'eaa_total', label: 'EAA — Total autoeficacia' },
      { id: 'ece_docente', label: 'ECE — Clima docente' },
      { id: 'ece_pares', label: 'ECE — Clima entre pares' },
      { id: 'ece_institucional', label: 'ECE — Clima institucional' },
      { id: 'ece_total', label: 'ECE — Total clima escolar' },
      { id: 'iesa_evaluativo', label: 'IESA — Estrés evaluativo' },
      { id: 'iesa_carga', label: 'IESA — Estrés por carga académica' },
      { id: 'iesa_total', label: 'IESA — Total estrés académico' },
    ],
    categoricalVars: [
      { id: 'sexo', label: 'Sexo', values: ['Mujer', 'Hombre', 'Otro'] },
      { id: 'nivel', label: 'Nivel de enseñanza media', values: ['1° Medio', '2° Medio', '3° Medio', '4° Medio'] },
      { id: 'tipo_establecimiento', label: 'Tipo de establecimiento', values: ['Municipal', 'Part. Subvencionado', 'Part. Pagado'] },
      { id: 'zona', label: 'Zona', values: ['Urbano', 'Rural'] },
      { id: 'nivel_ses', label: 'Nivel socioeconómico', values: ['Bajo', 'Medio', 'Alto'] },
      { id: 'repitencia', label: 'Ha repetido algún año', values: ['Sí', 'No'] },
      { id: 'trabaja', label: 'Trabaja de forma remunerada', values: ['Sí', 'No'] },
      { id: 'acceso_internet_hogar', label: 'Acceso a internet en el hogar', values: ['Sí', 'No'] },
      { id: 'apoyo_psicopedagogico', label: 'Apoyo psicopedagógico', values: ['Sí', 'No'] },
    ],
    instruments: [
      {
        id: 'ema', sigla: 'EMA', label: 'Escala de Motivación Académica',
        items: items('ema', 1, 18),
        subscales: [
          { id: 'ema_intrinseca', label: 'Motivación intrínseca', items: items('ema', 1, 6) },
          { id: 'ema_extrinseca', label: 'Motivación extrínseca', items: items('ema', 7, 12) },
          { id: 'ema_desmotivacion', label: 'Desmotivación', items: items('ema', 13, 18) },
        ],
      },
      {
        id: 'eaa', sigla: 'EAA', label: 'Escala de Autoeficacia Académica',
        items: items('eaa', 1, 14),
        subscales: [
          { id: 'eaa_tareas', label: 'Autoeficacia en tareas', items: items('eaa', 1, 7) },
          { id: 'eaa_social', label: 'Autoeficacia social', items: items('eaa', 8, 14) },
        ],
      },
      {
        id: 'ece', sigla: 'ECE', label: 'Escala de Clima Escolar',
        items: items('ece', 1, 16),
        subscales: [
          { id: 'ece_docente', label: 'Clima docente', items: items('ece', 1, 6) },
          { id: 'ece_pares', label: 'Clima entre pares', items: items('ece', 7, 11) },
          { id: 'ece_institucional', label: 'Clima institucional', items: items('ece', 12, 16) },
        ],
      },
      {
        id: 'iesa', sigla: 'IESA', label: 'Inventario de Estrés Académico',
        items: items('iesa', 1, 12),
        subscales: [
          { id: 'iesa_evaluativo', label: 'Estrés evaluativo', items: items('iesa', 1, 6) },
          { id: 'iesa_carga', label: 'Estrés por carga académica', items: items('iesa', 7, 12) },
        ],
      },
    ],
  },

  {
    id: 'social',
    filename: 'bd_social_comunitaria.csv',
    label: 'Social-Comunitaria',
    description: '20 organizaciones comunitarias — 520 participantes',
    n: 520,
    color: '#8e44ad',
    continuousVars: [
      { id: 'anos_residencia', label: 'Años de residencia en el barrio' },
      { id: 'anos_en_organizacion', label: 'Años en la organización' },
      { id: 'confianza_carabineros', label: 'Confianza en Carabineros (1–5)' },
      { id: 'confianza_municipio', label: 'Confianza en la Municipalidad (1–5)' },
      { id: 'esc_pertenencia', label: 'ESC — Sentido de pertenencia' },
      { id: 'esc_influencia', label: 'ESC — Influencia comunitaria' },
      { id: 'esc_total', label: 'ESC — Total sentido de comunidad' },
      { id: 'ecs_redes_apoyo', label: 'ECS — Redes de apoyo' },
      { id: 'ecs_confianza', label: 'ECS — Confianza interpersonal' },
      { id: 'ecs_normas_reciprocidad', label: 'ECS — Normas de reciprocidad' },
      { id: 'ecs_total', label: 'ECS — Total capital social' },
      { id: 'ebc_satisfaccion_barrio', label: 'EBC — Satisfacción con el barrio' },
      { id: 'ebc_cohesion', label: 'EBC — Cohesión comunitaria' },
      { id: 'ebc_total', label: 'EBC — Total bienestar comunitario' },
      { id: 'cps_formal', label: 'CPS — Participación formal' },
      { id: 'cps_informal', label: 'CPS — Participación informal' },
      { id: 'cps_total', label: 'CPS — Total participación social' },
    ],
    categoricalVars: [
      { id: 'sexo', label: 'Sexo', values: ['Mujer', 'Hombre', 'Otro'] },
      { id: 'nivel_educacional', label: 'Nivel educacional', values: ['Básica', 'Media', 'Técnico', 'Universitario', 'Postgrado'] },
      { id: 'tipo_organizacion', label: 'Tipo de organización', values: ['Junta vecinos', 'Club deportivo', 'Org. social', 'Voluntariado', 'Cooperativa'] },
      { id: 'tipo_zona', label: 'Zona', values: ['Urbano', 'Semi-rural', 'Rural'] },
      { id: 'nivel_ses', label: 'Nivel socioeconómico', values: ['Bajo', 'Medio', 'Alto'] },
      { id: 'cargo_directivo', label: 'Cargo directivo', values: ['Sí', 'No'] },
      { id: 'victima_delito_anio', label: 'Víctima de delito (último año)', values: ['Sí', 'No'] },
      { id: 'acceso_servicios_basicos', label: 'Acceso a servicios básicos', values: ['Sí', 'No'] },
      { id: 'migrante', label: 'Persona migrante', values: ['Sí', 'No'] },
    ],
    instruments: [
      {
        id: 'esc', sigla: 'ESC', label: 'Escala de Sentido de Comunidad',
        items: items('esc', 1, 16),
        subscales: [
          { id: 'esc_pertenencia', label: 'Sentido de pertenencia', items: items('esc', 1, 8) },
          { id: 'esc_influencia', label: 'Influencia comunitaria', items: items('esc', 9, 16) },
        ],
      },
      {
        id: 'ecs', sigla: 'ECS', label: 'Escala de Capital Social',
        items: items('ecs', 1, 18),
        subscales: [
          { id: 'ecs_redes_apoyo', label: 'Redes de apoyo', items: items('ecs', 1, 6) },
          { id: 'ecs_confianza', label: 'Confianza interpersonal', items: items('ecs', 7, 12) },
          { id: 'ecs_normas_reciprocidad', label: 'Normas de reciprocidad', items: items('ecs', 13, 18) },
        ],
      },
      {
        id: 'ebc', sigla: 'EBC', label: 'Escala de Bienestar Comunitario',
        items: items('ebc', 1, 14),
        subscales: [
          { id: 'ebc_satisfaccion_barrio', label: 'Satisfacción con el barrio', items: items('ebc', 1, 7) },
          { id: 'ebc_cohesion', label: 'Cohesión comunitaria', items: items('ebc', 8, 14) },
        ],
      },
      {
        id: 'cps', sigla: 'CPS', label: 'Cuestionario de Participación Social',
        items: items('cps', 1, 12),
        subscales: [
          { id: 'cps_formal', label: 'Participación formal', items: items('cps', 1, 6) },
          { id: 'cps_informal', label: 'Participación informal', items: items('cps', 7, 12) },
        ],
      },
    ],
  },

  {
    id: 'investigacion',
    filename: 'bd_investigacion.csv',
    label: 'Investigación',
    description: '6 universidades chilenas — 520 estudiantes de pregrado',
    n: 520,
    color: '#c0392b',
    continuousVars: [
      { id: 'promedio_acumulado', label: 'Promedio acumulado (1.0–7.0)' },
      { id: 'creditos_semestre', label: 'Créditos inscritos en el semestre' },
      { id: 'horas_trabajo_semana', label: 'Horas de trabajo semanal' },
      { id: 'horas_estudio_semana', label: 'Horas de estudio autónomo semanal' },
      { id: 'satisfaccion_carrera', label: 'Satisfacción con la carrera (1–5)' },
      { id: 'ere_reevaluacion', label: 'ERE — Reevaluación cognitiva' },
      { id: 'ere_supresion', label: 'ERE — Supresión expresiva' },
      { id: 'ere_total', label: 'ERE — Total regulación emocional' },
      { id: 'eag_conductual', label: 'EAG — Autoeficacia conductual' },
      { id: 'eag_cognitiva', label: 'EAG — Autoeficacia cognitiva' },
      { id: 'eag_total', label: 'EAG — Total autoeficacia general' },
      { id: 'epa_postergacion_tareas', label: 'EPA — Postergación de tareas' },
      { id: 'epa_postergacion_decisiones', label: 'EPA — Postergación de decisiones' },
      { id: 'epa_total', label: 'EPA — Total procrastinación' },
      { id: 'cbu_emocional', label: 'CBU — Bienestar emocional' },
      { id: 'cbu_vinculacion', label: 'CBU — Vinculación universitaria' },
      { id: 'cbu_satisfaccion_vital', label: 'CBU — Satisfacción vital' },
      { id: 'cbu_total', label: 'CBU — Total bienestar universitario' },
    ],
    categoricalVars: [
      { id: 'sexo', label: 'Sexo', values: ['Mujer', 'Hombre', 'Otro'] },
      { id: 'carrera', label: 'Carrera', values: ['Psicología', 'Educación', 'Trabajo Social', 'Enfermería', 'Otra'] },
      { id: 'ano_carrera', label: 'Año de carrera', values: ['1°', '2°', '3°', '4°', '5°'] },
      { id: 'primera_generacion_universitaria', label: 'Primera generación universitaria', values: ['Sí', 'No'] },
      { id: 'trabaja', label: 'Trabaja de forma remunerada', values: ['Sí', 'No'] },
      { id: 'tipo_beca', label: 'Tipo de beca', values: ['Sin beca', 'Gratuidad', 'Beca excelencia', 'Otra beca'] },
      { id: 'vive_con_familia', label: 'Vive con familia de origen', values: ['Sí', 'No'] },
      { id: 'uso_apoyo_psicologico', label: 'Ha usado apoyo psicológico universitario', values: ['Sí', 'No'] },
      { id: 'actividades_extracurriculares', label: 'Actividades extracurriculares', values: ['Sí', 'No'] },
    ],
    instruments: [
      {
        id: 'ere', sigla: 'ERE', label: 'Escala de Regulación Emocional',
        items: items('ere', 1, 16),
        subscales: [
          { id: 'ere_reevaluacion', label: 'Reevaluación cognitiva', items: items('ere', 1, 8) },
          { id: 'ere_supresion', label: 'Supresión expresiva', items: items('ere', 9, 16) },
        ],
      },
      {
        id: 'eag', sigla: 'EAG', label: 'Escala de Autoeficacia General',
        items: items('eag', 1, 14),
        subscales: [
          { id: 'eag_conductual', label: 'Autoeficacia conductual', items: items('eag', 1, 7) },
          { id: 'eag_cognitiva', label: 'Autoeficacia cognitiva', items: items('eag', 8, 14) },
        ],
      },
      {
        id: 'epa', sigla: 'EPA', label: 'Escala de Procrastinación Académica',
        items: items('epa', 1, 12),
        subscales: [
          { id: 'epa_postergacion_tareas', label: 'Postergación de tareas', items: items('epa', 1, 6) },
          { id: 'epa_postergacion_decisiones', label: 'Postergación de decisiones', items: items('epa', 7, 12) },
        ],
      },
      {
        id: 'cbu', sigla: 'CBU', label: 'Cuestionario de Bienestar Universitario',
        items: items('cbu', 1, 18),
        subscales: [
          { id: 'cbu_emocional', label: 'Bienestar emocional', items: items('cbu', 1, 6) },
          { id: 'cbu_vinculacion', label: 'Vinculación universitaria', items: items('cbu', 7, 12) },
          { id: 'cbu_satisfaccion_vital', label: 'Satisfacción vital', items: items('cbu', 13, 18) },
        ],
      },
    ],
  },
]

export function getDataset(id: string): DatasetMeta | undefined {
  return DATASETS.find((d) => d.id === id)
}
