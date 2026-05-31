/**
 * Technologies data
 * Stack elegido con justificación técnica — importante para la sección
 * "por qué lo escogiste" que pide Pixelworks.
 */

export const techCategories = [
  {
    id: 'frontend',
    label: 'Front-end',
    color: '#20E3B2',
    technologies: [
      {
        name: 'React',
        color: '#61DAFB',
        bg: 'rgba(97, 218, 251, 0.08)',
        rationale: 'SPA con estado complejo y ecosistema maduro',
      },
      {
        name: 'Vue',
        color: '#cd3ced',
        bg: 'rgba(210, 97, 251, 0.08)',
        rationale: 'Framework progresivo con curva de aprendizaje suave',
      },
      {
        name: 'Vite',
        color: '#FACC15',
        bg: 'rgba(250, 204, 21, 0.08)',
        rationale: 'Dev server rápido y bundles optimizados con Rollup',
      },
      {
        name: 'JavaScript',
        color: '#F7DF1E',
        bg: 'rgba(247, 223, 30, 0.08)',
        rationale: 'Async/await, Promises, consumo de APIs REST',
      },
      {
        name: 'HTML5',
        color: '#E34F26',
        bg: 'rgba(227, 79, 38, 0.08)',
        rationale: 'Semántica correcta para accesibilidad y SEO',
      },
      {
        name: 'CSS / Tailwind',
        color: '#38BDF8',
        bg: 'rgba(56, 189, 248, 0.08)',
        rationale: 'Diseño responsivo mobile-first desde el inicio',
      },
      {
        name: 'Framer Motion',
        color: '#BB5CF8',
        bg: 'rgba(187, 92, 248, 0.08)',
        rationale: 'Animaciones declarativas integradas con React lifecycle',
      },
      {
        name: 'React Router',
        color: '#F59E0B',
        bg: 'rgba(245, 158, 11, 0.08)',
        rationale: 'Enrutamiento client-side con rutas anidadas y lazy loading',
      },
      {
        name: 'Storybook',
        color: '#FF4785',
        bg: 'rgba(255, 71, 133, 0.08)',
        rationale: 'Documentación y desarrollo de componentes en aislamiento',
      },
    ],
  },
  {
    id: 'backend',
    label: 'Back-end',
    color: '#20E3B2',
    technologies: [
      {
        name: 'Node.js',
        color: '#84CC16',
        bg: 'rgba(132, 204, 22, 0.08)',
        rationale: 'Runtime JS en servidor, consistencia de lenguaje full-stack',
      },
      {
        name: 'Express',
        color: '#94A3B8',
        bg: 'rgba(148, 163, 184, 0.08)',
        rationale: 'Framework minimalista para APIs REST',
      },
      {
        name: 'Nitro',
        color: '#eb6774',
        bg: 'rgba(235, 10, 10, 0.08)',
        rationale: 'Framework para APIs y SSR, ligero y rápido',
      },
      {
        name: 'JavaScript',
        color: '#dc52ff',
        bg: 'rgba(207, 30, 247, 0.08)',
        rationale: 'Async/await, Promises, consumo de APIs REST',
      },
      {
        name: 'TypeScript',
        color: '#f79d1e',
        bg: 'rgba(247, 223, 30, 0.08)',
        rationale: 'Tipado estático para mejorar la mantenibilidad',
      },
      {
        name: 'python',
        color: '#dad850',
        bg: 'rgba(195, 255, 65, 0.08)',
        rationale: 'Util para scripting, automatización y data processing',
      },
      {
        name: 'Go',
        color: '#a5bde5',
        bg: 'rgba(0, 105, 253, 0.08)',
        rationale: 'Excelente para APIs y servicios de alto rendimiento',
      },
      {
        name: 'JWT',
        color: '#D97706',
        bg: 'rgba(217, 119, 6, 0.08)',
        rationale: 'Autenticación stateless, tokens firmados sin sesión en servidor',
      },
    ],
  },
  {
    id: 'databases',
    label: 'Bases de datos',
    color: '#20E3B2',
    technologies: [
      {
        name: 'PostgreSQL',
        color: '#1581da',
        bg: 'rgba(51, 103, 145, 0.12)',
        rationale: 'RDBMS robusto con soporte ACID completo',
      },
      {
        name: 'MariaDB',
        color: '#48d5df',
        bg: 'rgba(68, 121, 161, 0.12)',
        rationale: 'Modelo relacional para aplicaciones transaccionales',
      },
      {
        name: 'MySQL',
        color: '#47A248',
        bg: 'rgba(25, 239, 29, 0.08)',
        rationale: 'RDBMS popular para aplicaciones web tradicionales',
      },
      {
        name: 'SQLite',
        color: '#9c9c9c',
        bg: 'rgba(147, 147, 147, 0.08)',
        rationale: 'Ligera para prototipos y apps con baja concurrencia',
      },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps / Tools',
    color: '#20E3B2',
    technologies: [
      {
        name: 'Docker',
        color: '#2496ED',
        bg: 'rgba(36, 150, 237, 0.08)',
        rationale: 'Entornos reproducibles, dev/prod sin diferencias',
      },
      {
        name: 'Git / GitHub',
        color: '#F97316',
        bg: 'rgba(249, 115, 22, 0.08)',
        rationale: 'Control de versiones, feature branches, historial limpio',
      },
      {
        name: 'Linux / CLI',
        color: '#94A3B8',
        bg: 'rgba(148, 163, 184, 0.08)',
        rationale: 'Flujo de trabajo cotidiano en terminal',
      },
      {
        name: 'PaaS',
        color: '#c1f05c',
        bg: 'rgba(243, 255, 6, 0.08)',
        rationale: 'Plataformas de implementación en la nube',
      },
      {
        name: 'Testing',
        color: '#ea8fdc',
        bg: 'rgba(255, 1, 242, 0.08)',
        rationale: 'Pruebas unitarias y de integración',
      },
      {
        name: 'Postman',
        color: '#f5a7a7',
        bg: 'rgba(255, 128, 123, 0.08)',
        rationale: 'Herramienta para probar y documentar APIs REST',
      },
      {
        name: 'Vitest',
        color: '#6EE7B7',
        bg: 'rgba(110, 231, 183, 0.08)',
        rationale: 'Test runner integrado con Vite, más rápido que Jest en proyectos React',
      },
      {
        name: 'ESLint',
        color: '#8B5CF6',
        bg: 'rgba(139, 92, 246, 0.08)',
        rationale: 'Linting estático para mantener consistencia y buenas prácticas',
      },
    ],
  },
]

export const whyThisStack = `Para este proyecto, se eligió React combinado con Vite para construir un Single Page Applications o SPA. Además, Vite proporciona un entorno de desarrollo ultra rápido y tiempos de compilación mínimos, mientras que React da el control absoluto para crear interfaces modulares, reactivas y fáciles de escalar usando un enrutamiento robusto.`