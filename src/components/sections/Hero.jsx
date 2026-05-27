import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../ui/SocialIcons'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Pxdro-410',
    icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pedro-caso-310221405',
    icon: LinkedInIcon,
  },
  {
    label: 'Email',
    href: 'mailto:pedrojuliocaso@gmail.com',
    icon: Mail,
  },
]

// Text animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Status badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-indigo/30 bg-accent-indigo/5 text-accent-indigo text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Disponible para trabajar
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={item}
          className="font-mono text-accent-cyan text-base mb-4"
        >
          Hola, soy
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-text-primary">Pedro Julio </span>
          <span className="gradient-text">Caso</span>
        </motion.h1>

        {/* Title */}
        <motion.div variants={item} className="mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-text-secondary">
            Desarrollador{' '}
            <span className="text-text-primary font-medium">Full-Stack</span>
            {' '}·{' '}
            <span className="text-text-primary font-medium">Ingeniería en CC</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Construyo SPAs con React, APIs REST con Node.js y entornos reproducibles con Docker.
          Me especializo en frontend y bases de datos — me interesa que las cosas funcionen
          bien, no solo que compilen.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={scrollToProjects}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo hover:bg-accent-indigo-light text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-accent-indigo/25 hover:shadow-accent-indigo/40 hover:-translate-y-0.5"
          >
            Ver proyectos
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href="https://github.com/Pxdro-410"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-text-primary text-sm font-semibold hover:border-white/20 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <GitHubIcon className="w-4 h-4" />
            Ver GitHub
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-4"
        >
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-text-secondary transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-accent-indigo to-transparent rounded-full"
        />
      </motion.button>
    </section>
  )
}
