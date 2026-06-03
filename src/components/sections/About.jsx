import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import fotoPerfil from '../../assets/foto.jpg'

/* Iconos SVG inline */
function IconFolder({ open, color }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M1.5 3.5A1 1 0 0 1 2.5 2.5H6l1.5 1.5H13.5A1 1 0 0 1 14.5 5v7a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V3.5Z"
        fill={color || '#FEBC2E'}
        opacity="0.9"
      />
      <path d="M1.5 6h13v6a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V6Z" fill={color || '#FEBC2E'} />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M1.5 3.5A1 1 0 0 1 2.5 2.5H6l1.5 1.5H13.5A1 1 0 0 1 14.5 5v7a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V3.5Z"
        fill={color || '#E5C07B'}
        opacity="0.7"
      />
    </svg>
  )
}

function IconFile({ ext }) {
  const colors = {
    jsx: '#61DAFB', js: '#F7DF1E', ts: '#3178C6',
    sql: '#00758F', yml: '#CB171E', md: '#ABB2BF',
    sh: '#4EAA25', json: '#FEBC2E', txt: '#ABB2BF',
  }
  const c = colors[ext] || '#ABB2BF'
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2" y="1" width="9" height="12" rx="1" fill={c} opacity="0.18" />
      <path
        d="M2 2a1 1 0 0 1 1-1h5.5L12 4.5V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2Z"
        stroke={c}
        strokeWidth="0.9"
      />
      <path d="M8 1v3.5H11.5" stroke={c} strokeWidth="0.9" />
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none"
      style={{
        flexShrink: 0,
        transition: 'transform 0.18s ease',
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
      }}
    >
      <path d="M3 2l4 3-4 3" stroke="#484F58" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Componentes del árbol
function FileRow({ name, ext, indent = 1, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative flex items-center gap-2 px-2 py-[3px] rounded cursor-default select-none transition-colors duration-100"
      style={{
        paddingLeft: `${8 + indent * 16}px`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <IconFile ext={ext} />
      <span className="text-xs font-mono" style={{ color: '#C9D1D9' }}>
        {name}
      </span>
      {desc && hovered && (
        <span className="ml-2 text-xs truncate" style={{ color: '#484F58' }}>
          {desc}
        </span>
      )}
    </div>
  )
}

function FolderRow({ name, open, onClick, indent = 0, folderColor, children }) {
  return (
    <div>
      <div
        className="flex items-center gap-1.5 px-2 py-[3px] rounded cursor-pointer select-none transition-colors duration-100 hover:bg-white/5"
        style={{ paddingLeft: `${8 + indent * 16}px` }}
        onClick={onClick}
      >
        <ChevronIcon open={open} />
        <IconFolder open={open} color={folderColor} />
        <span className="text-xs font-mono font-medium" style={{ color: '#E5C07B' }}>
          {name}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Árbol completo
function FileTree() {
  const [open, setOpen] = useState({
    root: true,
    frontend: true,
    backend: false,
    databases: false,
    fullstack: false,
    formacion: false,
  })

  const toggle = (key) => setOpen((s) => ({ ...s, [key]: !s[key] }))

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/8 font-mono text-sm select-none"
      style={{ background: '#0D1117' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-white/6"
        style={{ background: '#161B22' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        <span className="ml-2 text-xs" style={{ color: '#484F58' }}>
          EXPLORADOR
        </span>
        <span className="ml-auto text-xs" style={{ color: '#3B4048' }}>
          pedro-caso/
        </span>
      </div>

      {/* Tree */}
      <div className="py-2" style={{ background: '#0D1117' }}>

        {/* Raíz */}
        <FolderRow
          name="pedro-caso"
          open={open.root}
          onClick={() => toggle('root')}
          indent={0}
          folderColor="#004FC4"
        >

          {/* 📁 frontend */}
          <FolderRow
            name="frontend"
            open={open.frontend}
            onClick={() => toggle('frontend')}
            indent={1}
            folderColor="#61DAFB"
          >
            <FileRow name="App.jsx" ext="jsx" indent={2} desc="React · SPAs · Vite" />
            <FileRow name="animations.ts" ext="ts" indent={2} desc="Framer Motion" />
            <FileRow name="components.jsx" ext="jsx" indent={2} desc="Interfaces interactivas" />
          </FolderRow>

          {/* 📁 backend */}
          <FolderRow
            name="backend"
            open={open.backend}
            onClick={() => toggle('backend')}
            indent={1}
            folderColor="#4EAA25"
          >
            <FileRow name="server.js" ext="js" indent={2} desc="Node.js · Express · Nitro" />
            <FileRow name="routes.js" ext="js" indent={2} desc="APIs REST" />
            <FileRow name="auth.js" ext="js" indent={2} desc="JWT · autenticación" />
          </FolderRow>

          {/* 📁 databases */}
          <FolderRow
            name="databases"
            open={open.databases}
            onClick={() => toggle('databases')}
            indent={1}
            folderColor="#00758F"
          >
            <FileRow name="schema.sql" ext="sql" indent={2} desc="PostgreSQL · MariaDB" />
            <FileRow name="migrations.sql" ext="sql" indent={2} desc="MySQL · SQLite" />
            <FileRow name="queries.sql" ext="sql" indent={2} desc="Consultas optimizadas" />
          </FolderRow>

          {/* 📁 fullstack */}
          <FolderRow
            name="fullstack"
            open={open.fullstack}
            onClick={() => toggle('fullstack')}
            indent={1}
            folderColor="#A50044"
          >
            <FileRow name="docker-compose.yml" ext="yml" indent={2} desc="Entornos reproducibles" />
            <FileRow name="deploy.sh" ext="sh" indent={2} desc="PaaS · CI/CD" />
          </FolderRow>

          {/* 📁 formacion */}
          <FolderRow
            name="formacion"
            open={open.formacion}
            onClick={() => toggle('formacion')}
            indent={1}
            folderColor="#E5C07B"
          >
            <FileRow name="UVG.md" ext="md" indent={2} desc="Ing. Ciencias de la Computación" />
            <FileRow name="ITM.md" ext="md" indent={2} desc="Becado · experiencia profesional" />
          </FolderRow>

          {/* Archivos sueltos */}
          <FileRow name="README.md" ext="md" indent={1} desc="Full-Stack Junior" />
          <FileRow name=".gitconfig" ext="txt" indent={1} desc="26+ repos públicos" />

        </FolderRow>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center gap-3 px-4 py-1.5 border-t border-white/6 text-xs"
        style={{ background: '#004FC4' }}
      >
        <span style={{ color: 'rgba(255,255,255,0.8)' }}>⎇  main</span>
        <span style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Full-Stack Developer</span>
        <span className="ml-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>UTF-8</span>
      </div>
    </div>
  )
}

// Sección principal
export default function About() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="about" ref={ref} className="relative py-24 px-6">
      {/* Section separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0,79,196,0.2), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-accent-blue text-sm mb-3">01. Sobre mí</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Quién soy y qué construyo
          </h2>
          <div className="w-12 h-0.5 bg-accent-blue rounded-full opacity-60" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Columna izquierda: foto + bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile photo */}
            {fotoPerfil ? (
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl overflow-hidden border-2"
                    style={{ borderColor: 'rgba(0,79,196,0.4)' }}
                  >
                    <img
                      src={fotoPerfil}
                      alt="Pedro Julio Caso"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: '0 0 20px rgba(0,79,196,0.2)' }}
                  />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">Pedro Julio Caso</h3>
                  <p className="text-text-secondary text-sm">
                    Desarrollador Full-Stack · UVG
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <div
                  className="w-20 h-20 rounded-2xl border border-dashed border-accent-blue/30 flex items-center justify-center flex-shrink-0"
                  title="Coloca tu foto en src/assets/foto.jpg"
                >
                  <span className="text-2xl font-bold text-accent-blue">PC</span>
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">Pedro Julio Caso</h3>
                  <p className="text-text-secondary text-sm">
                    Desarrollador Full-Stack · UVG
                  </p>
                </div>
              </div>
            )}

            <p className="text-text-secondary leading-relaxed text-base">
              Soy estudiante de Ciencias de la Computación en la{' '}
              <span className="text-text-primary font-medium">
                Universidad del Valle de Guatemala (UVG)
              </span>{' '}
              y Desarrollador Full-Stack Junior. A lo largo de mis últimos años
              programando, incluyendo mi experiencia como becado en ITM, he desarrollado
              una fuerte vocación por conectar ambos extremos del desarrollo: la creación
              de interfaces web intuitivas y el modelado robusto de bases de datos. Mi
              enfoque siempre está en entender el problema a fondo para diseñar la
              solución más eficiente posible.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: '26+', label: 'Repositorios públicos' },
                { value: '2+', label: 'Años programando' },
                { value: '2', label: 'Idiomas' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-4 rounded-xl bg-bg-surface border border-white/5"
                >
                  <div className="text-2xl font-bold text-accent-blue mb-1">{value}</div>
                  <div className="text-xs text-text-muted leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Columna derecha: File tree */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <FileTree />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
