# Configuración del Proyecto

## 1. Dependencias Node.js

```bash
npm install
```

Esto instalará:
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (gestión de estado)
- Framer Motion (animaciones)
- Anthropic SDK (para Gemini)

## 2. Activar Virtual Environment Python

```powershell
# PowerShell (Windows)
.\venv\Scripts\Activate.ps1

# Si tienes permisos restringidos, ejecuta primero:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Instalar herramientas Python (opcional)

```bash
pip install -r requirements.txt
```

Descomenta las librerías en `requirements.txt` si las necesitas.

## 3. Configurar Variables de Entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Luego completa las variables:

- **GEMINI_API_KEY**: Obtén una clave de API en [Google AI Studio](https://aistudio.google.com)
- **NEXT_PUBLIC_SUPABASE_URL** (opcional): URL de tu proyecto Supabase
- **NEXT_PUBLIC_SUPABASE_ANON_KEY** (opcional): Clave anónima de Supabase
- **SUPABASE_SERVICE_ROLE_KEY** (opcional): Clave de servicio de Supabase

## 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## 5. Configurar Repositorio GitHub

Una vez que estés listo:

```bash
# Cambiar a rama main (recomendado)
git branch -M main

# Agregar remoto
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Hacer commit inicial
git add .
git commit -m "Initial commit: project structure and configuration"

# Subir
git push -u origin main
```

## 6. Estructura de Desarrollo

### Para implementar nuevos contenidos:

1. Crear conceptos en `src/modules/{modulo}/`
2. Implementar actividades en `src/core/activities/`
3. Crear exploradores en `src/core/explorers/`
4. Registrar en el módulo correspondiente

### Consulta la arquitectura completa en:
- `docs/architecture.md`

## Comandos Útiles

```bash
# Compilar TypeScript sin emitir
npm run type-check

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Lint del código
npm run lint
```

## Notas

- La aplicación está lista para ser desplegada en **Vercel**
- Los contenidos pedagógicos están versionados en el repositorio (no en base de datos)
- La IA se llama **solo desde el servidor** (nunca se expone la API key al cliente)
- El módulo curso está **desactivado por defecto**
- R/Quarto está **previsto pero no obligatorio** en la primera implementación
