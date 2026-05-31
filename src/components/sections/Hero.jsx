import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../ui/SocialIcons'
import HeroParticles from '../canvas/HeroParticles'

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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* ── Hero background: animated gradient mesh ── */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: '#0D1117',
        }}
      />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(32, 227, 178, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(32, 227, 178, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial glow — top center (mint, clean) */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(32,227,178,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade to dark */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0D1117)',
        }}
      />

      {/* Floating constellation particles — z-0, behind text */}
      <HeroParticles />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(32,227,178,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(32,227,178,0.05) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Status badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-mint/30 bg-accent-mint/5 text-accent-mint text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
            Disponible para trabajar
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={item}
          className="font-mono text-accent-mint text-base mb-4"
        >
          Hola, soy
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-text-primary">Pedro Julio </span>
          <span className="text-accent-mint">Caso</span>
        </motion.h1>

        {/* Title */}
        <motion.div variants={item} className="mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-text-primary">
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
          Construyo SPAs, APIs REST, bases de datos hasta BCNF y entornos reproducibles con Docker.
          Me especializo en frontend y bases de datos, disfruto construir soluciones eficientes, escalables y mantenibles.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={scrollToProjects}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-mint hover:bg-accent-mint-light text-bg-base font-semibold text-sm transition-all duration-200 shadow-lg shadow-accent-mint/20 hover:shadow-accent-mint/35 hover:-translate-y-0.5"
          >
            Ver proyectos
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href="https://github.com/Pxdro-410"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-text-primary text-sm font-semibold hover:border-accent-mint/30 hover:bg-accent-mint/5 hover:-translate-y-0.5 transition-all duration-200"
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
              className="p-2.5 rounded-lg text-text-muted hover:text-accent-mint hover:bg-accent-mint/5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-7 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(32,227,178,0.5), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
