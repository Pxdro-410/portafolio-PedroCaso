import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projects } from '../../data/projects'
import { techCategories } from '../../data/technologies'
import { ExternalLink, Server, Container, Star, X, ChevronRight, Lightbulb } from 'lucide-react'
import { GitHubIcon } from '../ui/SocialIcons'

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
]

const GRADIENT_COLORS = {
  'from-indigo-500/20 to-violet-500/20': ['#818CF8', '#A78BFA'],
  'from-blue-500/20 to-cyan-500/20':     ['#60A5FA', '#22D3EE'],
  'from-orange-500/20 to-red-500/20':    ['#FB923C', '#EF4444'],
  'from-red-500/20 to-rose-500/20':      ['#EF4444', '#FB7185'],
  'from-emerald-500/20 to-green-500/20': ['#34D399', '#4ADE80'],
  'from-purple-500/20 to-fuchsia-500/20':['#C084FC', '#E879F9'],
  'from-sky-500/20 to-blue-500/20':      ['#38BDF8', '#60A5FA'],
}

// Maps tech name → { color, bg } from the Technologies section data
const techColorMap = Object.fromEntries(
  techCategories.flatMap((cat) =>
    cat.technologies.map((tech) => [tech.name, { color: tech.color, bg: tech.bg }])
  )
)

function TechBadge({ name }) {
  const style = techColorMap[name]
  return (
    <span
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border"
      style={{
        color: style?.color ?? '#8B949E',
        backgroundColor: style?.bg ?? 'rgba(139,148,158,0.08)',
        borderColor: style?.color ? `${style.color}35` : 'rgba(139,148,158,0.2)',
      }}
    >
      {style && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: style.color }}
        />
      )}
      {name}
    </span>
  )
}

function ProjectCard({ project, onOpen, index }) {
  const [colorA, colorB] = GRADIENT_COLORS[project.gradient] ?? ['#20E3B2', '#20E3B2']

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{
        y: -6,
        boxShadow: `0 10px 40px ${colorA}35, 0 0 0 1px ${colorA}35`,
      }}
      onClick={() => onOpen(project)}
      className="cursor-pointer relative rounded-2xl bg-bg-surface border border-white/5 overflow-hidden group transition-colors duration-300"
    >
      {/* Colored top bar (inline avoids Tailwind purge issues) */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(to right, ${colorA}, ${colorB})` }}
      />

      {/* Tinted hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top center, ${colorA}18 0%, transparent 65%)` }}
        aria-hidden="true"
      />

      <div className="relative p-5 space-y-3.5">
        {/* Star-only badge for featured */}
        <div className="flex items-center min-h-[22px]">
          {project.featured && (
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full border border-yellow-400/35 bg-yellow-400/10 text-yellow-400"
              title="Proyecto destacado"
            >
              <Star className="w-3 h-3 fill-current" />
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-text-primary group-hover:text-white transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Tech tags — text-secondary for visibility */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-bg-elevated border border-white/8 text-text-secondary text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Click hint */}
        <div
          className="flex items-center gap-1 text-xs pt-1.5 border-t border-white/5 transition-opacity duration-200"
          style={{ color: colorA, opacity: 0.55 }}
        >
          <span className="group-hover:opacity-100 transition-opacity" style={{ opacity: 1 }}>
            Ver detalles
          </span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.article>
  )
}

function ProjectModal({ project, onClose }) {
  const [colorA, colorB] = GRADIENT_COLORS[project.gradient] ?? ['#20E3B2', '#20E3B2']

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(13,17,23,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 18 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full max-w-2xl bg-bg-elevated border border-white/10 rounded-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div
          className="h-1 w-full flex-shrink-0"
          style={{ background: `linear-gradient(to right, ${colorA}, ${colorB})` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-white/6 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white leading-snug">{project.title}</h3>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {project.featured && (
                <span
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border"
                  style={{ color: colorA, backgroundColor: `${colorA}12`, borderColor: `${colorA}35` }}
                >
                  <Star className="w-3 h-3 fill-current" />
                  Destacado
                </span>
              )}
              {project.hasBackend && (
                <span className="flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Server className="w-3 h-3" />
                  Backend
                </span>
              )}
              {project.hasDocker && (
                <span className="flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Container className="w-3 h-3" />
                  Docker
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body: 2-column layout on md+ */}
        <div className="flex-1 overflow-hidden grid md:grid-cols-[1fr_240px]">
          {/* Left: text content */}
          <div className="overflow-y-auto p-6 space-y-5 md:border-r border-white/6">
            {/* Description */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: colorA, opacity: 0.7 }}>
                Descripción
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech rationale */}
            <div
              className="p-4 rounded-xl border"
              style={{ backgroundColor: `${colorA}08`, borderColor: `${colorA}25` }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colorA }} />
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: colorA }}>
                  ¿Por qué estas tecnologías?
                </p>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.techRationale}
              </p>
            </div>
          </div>

          {/* Right: meta + stack + links */}
          <div className="overflow-y-auto p-6 space-y-5 flex flex-col">
            {/* Stack with colors */}
            <div>
              <p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-3">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TechBadge key={tag} name={tag} />
                ))}
              </div>
            </div>

            {/* Links pushed to bottom on larger screens */}
            <div className="mt-auto pt-4 border-t border-white/6 flex flex-col gap-2.5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-white/20 text-xs font-medium transition-colors"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                Ver código
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
                  style={{
                    backgroundColor: `${colorA}15`,
                    border: `1px solid ${colorA}35`,
                    color: colorA,
                  }}
                >
                  Demo en vivo
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, visible] = useScrollReveal()
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" ref={ref} className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-accent-mint text-sm mb-3">03. Proyectos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Lo que he construido
          </h2>
          <div className="w-12 h-0.5 bg-accent-mint rounded-full opacity-60 mb-6" />
          <p className="text-text-secondary max-w-2xl text-sm sm:text-base leading-relaxed">
            Cada proyecto tiene un README con instrucciones de instalación, decisiones
            técnicas documentadas y el código en un repositorio público. Sin excepciones.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filtrar proyectos"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                filter === f.id
                  ? 'text-bg-base shadow-lg'
                  : 'bg-bg-surface border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
              }`}
              style={
                filter === f.id
                  ? { backgroundColor: '#20E3B2', boxShadow: '0 4px 16px rgba(32,227,178,0.2)' }
                  : {}
              }
            >
              {f.label}
              <span className="ml-2 text-xs opacity-60">
                ({f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div key={filter} layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setSelectedProject}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-text-secondary text-sm mb-4">¿Quieres ver el resto de proyectos?</p>
          <a
            href="https://github.com/Pxdro-410"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <GitHubIcon className="w-4 h-4" />
            Ver todos en GitHub
          </a>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
