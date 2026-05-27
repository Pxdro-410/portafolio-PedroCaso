import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { GraduationCap, Code2, Database, Layers } from 'lucide-react'

const HIGHLIGHTS = [
  {
    icon: Code2,
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.08)',
    label: 'Front-end',
    description: 'React, SPAs, interfaces interactivas y animaciones.',
  },
  {
    icon: Database,
    color: '#22D3EE',
    bg: 'rgba(34,211,238,0.08)',
    label: 'Bases de datos',
    description: 'Diseño de esquemas, consultas optimizadas, PostgreSQL y MongoDB.',
  },
  {
    icon: Layers,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    label: 'Full-Stack',
    description: 'APIs REST con Node.js, autenticación JWT y Docker Compose.',
  },
  {
    icon: GraduationCap,
    color: '#84CC16',
    bg: 'rgba(132,204,22,0.08)',
    label: 'Formación',
    description: 'Ingeniería en Ciencias de la Computación — en curso.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function About() {
  const [ref, visible] = useScrollReveal()

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-6"
    >
      {/* Section glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
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
          <p className="font-mono text-accent-cyan text-sm mb-3">01. Sobre mí</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Quién soy y qué construyo
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-cyan rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-text-secondary leading-relaxed text-base">
              Soy <span className="text-text-primary font-medium">Pedro Julio Caso</span>,
              estudiante de <span className="text-accent-indigo font-medium">Ingeniería en Ciencias
              de la Computación</span> con 22 años. Me apasiona construir
              software que resuelve problemas reales — desde interfaces que se sientan rápidas
              y fluidas hasta bases de datos bien diseñadas que escalen sin romperse.
            </p>

            <p className="text-text-secondary leading-relaxed text-base">
              Mi enfoque es <span className="text-text-primary font-medium">pensar antes de escribir
              código</span>. Elijo las herramientas según el problema, no al revés. Cuando
              construyo algo, me pregunto: ¿tiene sentido el stack? ¿Puedo defenderlo en una
              conversación técnica? ¿El README explica qué hace y por qué, no solo cómo instalarlo?
            </p>

            <p className="text-text-secondary leading-relaxed text-base">
              Tengo especial interés en el <span className="text-accent-cyan font-medium">frontend
              y las bases de datos</span> — ese punto donde la experiencia del usuario se encuentra
              con la integridad de los datos. La mayoría de mis proyectos tienen las dos capas.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '27+', label: 'Repositorios públicos' },
                { value: '3+', label: 'Años programando' },
                { value: '2', label: 'Idiomas' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-4 rounded-xl bg-bg-surface border border-white/5">
                  <div className="text-2xl font-bold gradient-text mb-1">{value}</div>
                  <div className="text-xs text-text-muted leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, color, bg, label, description }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={visible ? 'show' : 'hidden'}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-5 rounded-2xl bg-bg-surface border border-white/5 hover:border-white/10 transition-colors duration-300 cursor-default overflow-hidden group"
              >
                {/* Subtle gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${color}15 0%, transparent 60%)` }}
                  aria-hidden="true"
                />

                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: bg }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>

                <h3 className="relative text-sm font-semibold text-text-primary mb-1.5">
                  {label}
                </h3>
                <p className="relative text-xs text-text-secondary leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
