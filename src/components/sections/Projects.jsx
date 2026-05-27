import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projects } from '../../data/projects'
import { ExternalLink, Server, Container, Star } from 'lucide-react'
import { GitHubIcon } from '../ui/SocialIcons'

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
]

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl bg-bg-surface border overflow-hidden group transition-all duration-300 flex flex-col ${
        project.featured
          ? 'border-accent-indigo/30 hover:border-accent-indigo/60'
          : 'border-white/5 hover:border-white/15'
      }`}
    >
      {/* Card gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        aria-hidden="true"
      />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-indigo/15 border border-accent-indigo/30 text-accent-indigo-light text-xs font-medium">
          <Star className="w-3 h-3 fill-current" />
          Destacado
        </div>
      )}

      {/* Header bar (decorative) */}
      <div className="relative h-1 w-full">
        <div className={`h-full bg-gradient-to-r ${project.gradient.replace('/20', '')} opacity-60`} />
      </div>

      <div className="relative p-6 flex flex-col flex-1 gap-4">
        {/* Badges: backend / docker */}
        <div className="flex items-center gap-2">
          {project.hasBackend && (
            <span className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Server className="w-3 h-3" />
              Backend
            </span>
          )}
          {project.hasDocker && (
            <span className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Container className="w-3 h-3" />
              Docker
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-text-primary group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-bg-elevated border border-white/5 text-text-muted text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-xs font-medium transition-colors"
            aria-label={`Ver código de ${project.title} en GitHub`}
          >
            <GitHubIcon className="w-4 h-4" />
            Código
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-accent-cyan hover:text-accent-cyan-light text-xs font-medium transition-colors ml-auto"
              aria-label={`Ver demo de ${project.title}`}
            >
              Demo en vivo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [ref, visible] = useScrollReveal()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 px-6"
    >
      {/* Background glow */}
      <div
        className="absolute left-0 top-1/3 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-accent-cyan text-sm mb-3">03. Proyectos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Lo que he construido
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-cyan rounded-full mb-6" />
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
          {FILTERS.map(f => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                filter === f.id
                  ? 'bg-accent-indigo text-white shadow-lg shadow-accent-indigo/25'
                  : 'bg-bg-surface border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
              }`}
            >
              {f.label}
              <span className="ml-2 text-xs opacity-60">
                ({f.id === 'all' ? projects.length : projects.filter(p => p.category === f.id).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
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
          <p className="text-text-secondary text-sm mb-4">
            ¿Quieres ver el resto de proyectos?
          </p>
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
    </section>
  )
}
