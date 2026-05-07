# Aplicación de Metodología Cuantitativa

Aplicación pedagógica autocontenida para aprender metodología cuantitativa, medición, psicometría y estadística aplicada.

## Estructura

- **src/app**: Rutas de Next.js, layouts y páginas
- **src/core**: Contrato, servicios y lógica reusable
- **src/modules**: Módulos pedagógicos (metodología, medición, psicometría, estadística, R/Quarto, curso)
- **src/infrastructure**: Adaptadores a Gemini, Supabase y otros proveedores
- **src/ui**: Componentes visuales reutilizables
- **src/types**: Tipos compartidos
- **docs**: Documentación de arquitectura

## Configuración Inicial

### 1. Instalar dependencias Node.js

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Agregar:
- `GEMINI_API_KEY`: Tu clave de API de Google Gemini
- (Opcional) Credenciales de Supabase si se usa

### 3. Crear y activar el venv de Python 3.12

```bash
# Si ya no está activado
.\venv\Scripts\Activate.ps1
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Principios Arquitectónicos

- **Núcleo independiente**: No depende de cursos, calendarios ni configuraciones institucionales
- **Modularidad explícita**: Cada módulo declara lo que agrega
- **Contenido versionado**: Todos los conceptos, actividades y prompts están versionados
- **IA auditable**: Las interacciones registran versiones de prompt y contenido
- **Interacción aplicada**: Exploradores interactivos para manipular, visualizar y comparar

Ver `docs/architecture.md` para detalles completos.
