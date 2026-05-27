/**
 * Projects data
 * ⚠️  PLACEHOLDER — reemplazar con los proyectos reales de Pedro
 *
 * Estructura de cada proyecto:
 * - id: slug único
 * - title: nombre del proyecto
 * - description: qué problema resuelve (1-2 oraciones directas)
 * - longDescription: por qué tomaste las decisiones técnicas que tomaste
 * - tags: tecnologías usadas (máximo 5-6 para que no se vea saturado)
 * - github: URL al repositorio público
 * - live: URL del deploy (puede ser null si no está desplegado)
 * - featured: true para mostrarlo primero/destacado
 * - hasBackend: true si tiene servidor propio
 * - hasDocker: true si incluye Docker
 * - category: 'fullstack' | 'frontend' | 'backend'
 */

// ⚠️  PENDIENTE — Se agregarán los proyectos reales en el siguiente paso del plan de trabajo.
// Estructura de cada objeto:
//   id, title, description, tags, github, live, featured, hasBackend, hasDocker, category, gradient

export const projects = [
  {
    id: 'pendiente-1',
    title: 'Proyecto pendiente por agregar',
    description: 'Proyecto pendiente por agregar.',
    tags: [],
    github: 'https://github.com/Pxdro-410',
    live: null,
    featured: true,
    hasBackend: false,
    hasDocker: false,
    category: 'fullstack',
    gradient: 'from-indigo-500/20 to-cyan-500/20',
  },
  {
    id: 'pendiente-2',
    title: 'Proyecto pendiente por agregar',
    description: 'Proyecto pendiente por agregar.',
    tags: [],
    github: 'https://github.com/Pxdro-410',
    live: null,
    featured: true,
    hasBackend: false,
    hasDocker: false,
    category: 'fullstack',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'pendiente-3',
    title: 'Proyecto pendiente por agregar',
    description: 'Proyecto pendiente por agregar.',
    tags: [],
    github: 'https://github.com/Pxdro-410',
    live: null,
    featured: false,
    hasBackend: false,
    hasDocker: false,
    category: 'fullstack',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
  },
]
