import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Mail, ArrowUpRight } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../ui/SocialIcons'

const CONTACT_LINKS = [
  {
    label: 'GitHub',
    description: 'Mira el código',
    href: 'https://github.com/Pxdro-410',
    icon: GitHubIcon,
    color: '#F1F5F9',
    bg: 'rgba(241,245,249,0.05)',
    border: 'rgba(241,245,249,0.1)',
  },
  {
    label: 'LinkedIn',
    description: 'Conectemos',
    href: 'https://www.linkedin.com/in/pedro-caso-310221405',
    icon: LinkedInIcon,
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.08)',
    border: 'rgba(10,102,194,0.3)',
  },
  {
    label: 'Email',
    description: 'Escríbeme directo',
    href: 'mailto:pedrojuliocaso@gmail.com',
    icon: Mail,
    color: '#22D3EE',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.3)',
  },
]

export default function Contact() {
  const [ref, visible] = useScrollReveal()

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-6 pb-32"
    >
      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(32,227,178,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-accent-mint text-sm mb-3">04. Contacto</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            ¿Hablamos?
          </h2>
          <div className="w-12 h-0.5 bg-accent-mint rounded-full mx-auto mb-8" />

          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Estoy abierto a oportunidades laborales, colaboraciones, o trabajos en proyectos para ganar experiencia,
            si te interesan mis servicios, no dudes en contactarme.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {CONTACT_LINKS.map(({ label, description, href, icon: Icon, color, bg, border }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group flex items-center gap-4 w-full sm:w-auto px-6 py-5 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: bg,
                border: `1px solid ${border}`,
              }}
              aria-label={`${label} — ${description}`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>

              <div className="text-left">
                <div className="text-sm font-semibold text-text-primary">
                  {label}
                </div>
                <div className="text-xs text-text-secondary">
                  {description}
                </div>
              </div>

              <ArrowUpRight
                className="w-4 h-4 text-text-muted ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:text-text-secondary"
              />
            </motion.a>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 text-text-muted text-xs font-mono"
        >
          Construido con React + Vite · Animaciones con Framer Motion · Deployed en Vercel
        </motion.p>
      </div>
    </section>
  )
}
