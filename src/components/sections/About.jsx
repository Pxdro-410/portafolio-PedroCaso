import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { GraduationCap, Code2, Database, Layers, Server } from 'lucide-react'
import fotoPerfil from '../../assets/foto.jpg'

const HIGHLIGHTS = [
  {
    icon: Code2,
    color: '#20E3B2',
    bg: 'rgba(32,227,178,0.08)',
    label: 'Front-end',
    description: 'React, SPAs, interfaces interactivas y animaciones con Framer Motion.',
  },
  {
    icon: Server,
    color: '#8B949E',
    bg: 'rgba(139,148,158,0.08)',
    label: 'Back-end',
    description: 'Node.js, Express, Nitro — APIs REST y servicios con autenticación JWT.',
  },
  {
    icon: Database,
    color: '#60A5FA',
    bg: 'rgba(96,165,250,0.08)',
    label: 'Bases de datos',
    description: 'PostgreSQL, MariaDB, MySQL, SQLite — diseño de esquemas y consultas optimizadas.',
  },
  {
    icon: Layers,
    color: '#34D399',
    bg: 'rgba(52,211,153,0.08)',
    label: 'Full-Stack',
    description: 'Docker Compose, entornos reproducibles, deploy en PaaS.',
  },
  {
    icon: GraduationCap,
    color: '#F5F5F0',
    bg: 'rgba(245,245,240,0.05)',
    label: 'Formación',
    description: 'Ingeniería en Ciencias de la Computación — UVG, en curso.',
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
      {/* Section separator — clean top border, no glow bleeding into hero */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(32,227,178,0.2), transparent)' }}
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
          <p className="font-mono text-accent-mint text-sm mb-3">01. Sobre mí</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Quién soy y qué construyo
          </h2>
          <div className="w-12 h-0.5 bg-accent-mint rounded-full opacity-60" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio text + photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile photo — visible when fotoPerfil is set */}
            {fotoPerfil ? (
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl overflow-hidden border-2"
                    style={{ borderColor: 'rgba(32,227,178,0.4)' }}
                  >
                    <img
                      src={fotoPerfil}
                      alt="Pedro Julio Caso"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Mint glow ring */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: '0 0 20px rgba(32,227,178,0.2)' }}
                  />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">Pedro Julio Caso</h3>
                  <p className="text-text-secondary text-sm">Desarrollador Full-Stack · UVG</p>
                </div>
              </div>
            ) : (
              /* Placeholder cuando no hay foto */
              <div className="flex items-center gap-5">
                <div
                  className="w-20 h-20 rounded-2xl border border-dashed border-accent-mint/30 flex items-center justify-center flex-shrink-0"
                  title="Coloca tu foto en src/assets/foto.jpg"
                >
                  <span className="text-2xl font-bold text-accent-mint">PC</span>
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">Pedro Julio Caso</h3>
                  <p className="text-text-secondary text-sm">Desarrollador Full-Stack · UVG</p>
                </div>
              </div>
            )}

            <p className="text-text-secondary leading-relaxed text-base">
              Soy estudiante de Ciencias de la Computación en la{' '}
              <span className="text-text-primary font-medium">Universidad del Valle de Guatemala (UVG)</span>{' '}
              y Desarrollador Full-Stack Junior. A lo largo de mis últimos años programando,
              incluyendo mi experiencia como becado en ITM, he desarrollado una fuerte vocación
              por conectar ambos extremos del desarrollo: la creación de interfaces web intuitivas
              y el modelado robusto de bases de datos. Mi enfoque siempre está en entender el
              problema a fondo para diseñar la solución más eficiente posible.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: '26+', label: 'Repositorios públicos' },
                { value: '2+', label: 'Años programando' },
                { value: '2', label: 'Idiomas' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-4 rounded-xl bg-bg-surface border border-white/5">
                  <div className="text-2xl font-bold text-accent-mint mb-1">{value}</div>
                  <div className="text-xs text-text-muted leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards — 5 items in responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
