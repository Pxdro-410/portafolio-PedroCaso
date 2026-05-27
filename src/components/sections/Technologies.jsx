import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { techCategories, whyThisStack } from '../../data/technologies'
import { Quote } from 'lucide-react'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const badge = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
}

export default function Technologies() {
  const [ref, visible] = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState(null)

  const displayedCategories = activeCategory
    ? techCategories.filter(c => c.id === activeCategory)
    : techCategories

  return (
    <section
      id="technologies"
      ref={ref}
      className="relative py-24 px-6"
    >
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, transparent 70%)' }}
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
          <p className="font-mono text-accent-cyan text-sm mb-3">02. Stack</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Tecnologías que uso
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-cyan rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl leading-relaxed text-sm sm:text-base">
            No es una lista de lo que puedo googlear. Es el stack que elegí, con el que he
            construido proyectos reales, y que puedo defender técnicamente.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeCategory === null
                ? 'bg-accent-indigo text-white shadow-lg shadow-accent-indigo/20'
                : 'bg-bg-surface border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
            }`}
          >
            Todos
          </button>
          {techCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'text-white shadow-lg'
                  : 'bg-bg-surface border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
              }`}
              style={
                activeCategory === cat.id
                  ? { backgroundColor: cat.color, boxShadow: `0 4px 16px ${cat.color}40` }
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Tech grid by category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? 'all'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {displayedCategories.map((cat) => (
              <div key={cat.id}>
                {/* Category label */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-mono font-medium uppercase tracking-widest"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                  <div
                    className="h-px flex-1 opacity-20"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>

                {/* Tech badges */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="flex flex-wrap gap-3"
                >
                  {cat.technologies.map((tech) => (
                    <motion.div
                      key={tech.name}
                      variants={badge}
                      whileHover={{ y: -3, transition: { duration: 0.15 } }}
                      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/8 transition-all duration-200 cursor-default"
                      style={{ backgroundColor: tech.bg }}
                      title={tech.rationale}
                    >
                      {/* Color dot */}
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: tech.color }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: tech.color }}
                      >
                        {tech.name}
                      </span>

                      {/* Tooltip with rationale */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-bg-elevated border border-white/10 text-xs text-text-secondary rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10 shadow-xl max-w-xs text-center">
                        {tech.rationale}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* "Why this stack" reasoning block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-6 rounded-2xl bg-bg-surface border border-accent-indigo/20 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none rounded-2xl"
            style={{ background: 'radial-gradient(ellipse at top left, rgba(99,102,241,0.12) 0%, transparent 60%)' }}
            aria-hidden="true"
          />

          <div className="relative flex gap-4">
            <Quote className="w-5 h-5 text-accent-indigo flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-mono text-accent-indigo uppercase tracking-widest mb-3">
                Por qué este stack
              </p>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {whyThisStack}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
