import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import fotoPerfil from '../../assets/foto.jpg'

const CONCEPTS = [
  { prefix: '$', text: 'git commit -m "always be learning"', color: '#F97316' },
  { prefix: '$', text: 'docker compose up --build', color: '#4D8FF0' },
  { prefix: '>', text: 'SELECT skills FROM pedro WHERE love = true', color: '#60A5FA' },
  { prefix: '$', text: 'go build ./api && ./api --port 8080', color: '#93C5FD' },
  { prefix: 'λ', text: 'const solve = (problem) => solution', color: '#FACC15' },
  { prefix: '<', text: 'App ideas={Infinity} running={true} />', color: '#61DAFB' },
  { prefix: '$', text: 'npm run build && npm run deploy', color: '#84CC16' },
  { prefix: '$', text: 'ssh pedro@portfolio # building things', color: '#5B9EFF' },
  { prefix: '>', text: 'type Dev = { name: string; passion: true }', color: '#f79d1e' },
  { prefix: '$', text: 'kubectl apply -f k8s/deployment.yaml', color: '#E8003D' },
]

const NAV_ITEMS = [
  { label: 'Sobre mí', section: '#about' },
  { label: 'Stack', section: '#technologies' },
  { label: 'Proyectos', section: '#projects' },
  { label: 'Contacto', section: '#contact' },
]

const TYPING_SPEED = 42
const PAUSE_AFTER = 2400
const FADE_OUT = 380

// Blaugrana accent
const BLU = '#004FC4'
const RED = '#A50044'

// Función para dibujar una cruz (+) iluminada 
function drawCross(ctx, x, y, size, thickness, r, g, b, opacity) {
  ctx.save()
  ctx.lineCap = 'round'

  // Glow exterior difuso
  ctx.globalAlpha = opacity * 0.15
  ctx.strokeStyle = `rgb(${r},${g},${b})`
  ctx.lineWidth = thickness * 5.5
  ctx.beginPath()
  ctx.moveTo(x - size * 1.9, y)
  ctx.lineTo(x + size * 1.9, y)
  ctx.moveTo(x, y - size * 1.9)
  ctx.lineTo(x, y + size * 1.9)
  ctx.stroke()

  // Glow medio
  ctx.globalAlpha = opacity * 0.30
  ctx.lineWidth = thickness * 2.5
  ctx.beginPath()
  ctx.moveTo(x - size * 1.35, y)
  ctx.lineTo(x + size * 1.35, y)
  ctx.moveTo(x, y - size * 1.35)
  ctx.lineTo(x, y + size * 1.35)
  ctx.stroke()

  // Línea central nítida
  ctx.globalAlpha = Math.max(0.07, opacity)
  ctx.lineWidth = thickness
  ctx.beginPath()
  ctx.moveTo(x - size, y)
  ctx.lineTo(x + size, y)
  ctx.moveTo(x, y - size)
  ctx.lineTo(x, y + size)
  ctx.stroke()

  ctx.restore()
}

// Starfield canvas con cruces 
function StarCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const mkStar = (preborn = false) => {
      const isGiant = Math.random() < 0.045
      const roll = Math.random()
      const tint = roll < 0.04 ? 'blue' : roll < 0.065 ? 'red' : null
      const tgt = isGiant
        ? Math.random() * 0.60 + 0.40
        : Math.random() * 0.50 + 0.08
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isGiant
          ? Math.random() * 2.2 + 2.8
          : Math.pow(Math.random(), 1.8) * 2.5 + 0.7,
        thick: isGiant ? Math.random() * 0.5 + 0.7 : Math.random() * 0.4 + 0.5,
        op: preborn ? Math.random() * tgt : 0,
        tgt,
        speed: Math.random() * 0.005 + 0.002,
        phase: preborn ? 'live' : 'in',
        twinkle: Math.random() * Math.PI * 2,
        alive: 0,
        maxAlive: isGiant
          ? Math.random() * 7000 + 5000
          : Math.random() * 5000 + 3000,
        giant: isGiant,
        tint,
      }
    }

    // Meteoros
    const mkMeteor = () => {
      const angle = ((Math.random() * 22 + 32) * Math.PI) / 180
      const speed = Math.random() * 0.28 + 0.32
      return {
        x: Math.random() * canvas.width * 1.3 - canvas.width * 0.15,
        y: -50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tailLen: Math.random() * 110 + 90,
        op: 0,
        life: 0,
        totalLife: Math.random() * 1600 + 1800,
        dead: false,
      }
    }

    let stars = []
    let meteors = []
    let nextMet = Math.random() * 5000 + 4000

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stars = Array.from({ length: 230 }, () => mkStar(true))
    }

    let prev = 0
    const draw = (ts) => {
      const dt = Math.min(ts - prev, 50)
      prev = ts

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar cruces/estrellas 
      for (const s of stars) {
        if (s.phase === 'in') {
          s.op = Math.min(s.op + s.speed * dt, s.tgt)
          if (s.op >= s.tgt) s.phase = 'live'
        } else if (s.phase === 'live') {
          s.alive += dt
          const base = s.giant ? 0.65 : 0.72
          const amp = s.giant ? 0.35 : 0.28
          s.op = s.tgt * (base + amp * Math.sin(ts * 0.0017 + s.twinkle))
          if (s.alive > s.maxAlive) s.phase = 'out'
        } else {
          s.op -= s.speed * dt * 0.55
          if (s.op <= 0) Object.assign(s, mkStar(false))
        }

        const op = Math.max(0, s.op)
        if (op < 0.01) continue

        // Color según tinte
        let r = 255, g = 255, b = 255
        if (s.tint === 'blue') { r = 100; g = 150; b = 255 }
        else if (s.tint === 'red') { r = 255; g = 120; b = 150 }

        drawCross(ctx, s.x, s.y, s.size, s.thick, r, g, b, op)
      }

      // Meteoros
      nextMet -= dt
      if (nextMet <= 0) {
        if (meteors.filter((m) => !m.dead).length < 2) meteors.push(mkMeteor())
        nextMet = Math.random() * 2000 + 1000
      }

      for (const m of meteors) {
        if (m.dead) continue
        m.x += m.vx * dt
        m.y += m.vy * dt
        m.life += dt

        const t = m.life / m.totalLife
        if (t < 0.1) m.op = Math.min(m.op + 0.07 * (dt / 16), 0.88)
        else if (t > 0.65) m.op = Math.max(m.op - 0.04 * (dt / 16), 0)

        if (m.life > m.totalLife || m.y > canvas.height + 80) {
          m.dead = true
          continue
        }

        const spd = Math.sqrt(m.vx * m.vx + m.vy * m.vy)
        const ux = -m.vx / spd
        const uy = -m.vy / spd
        const tx = m.x + ux * m.tailLen
        const ty = m.y + uy * m.tailLen

        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty)
        grad.addColorStop(0, `rgba(255,255,255,${m.op.toFixed(3)})`)
        grad.addColorStop(0.2, `rgba(200,220,255,${(m.op * 0.6).toFixed(3)})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')

        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tx, ty)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.8
        ctx.stroke()

        // Cabeza del meteoro como pequeña cruz
        drawCross(ctx, m.x, m.y, 2.5, 0.8, 255, 255, 255, m.op)
      }

      if (meteors.length > 6) meteors = meteors.filter((m) => !m.dead)

      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

// Nav buttons simples 
function NavButtons({ items, goto }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-5">
      {items.map((item) => (
        <motion.button
          key={item.section}
          onClick={() => goto(item.section)}
          className="px-5 py-2.5 rounded-lg font-sans text-sm font-medium border border-white/10 transition-colors duration-200"
          style={{ color: '#8B949E' }}
          whileHover={{
            color: '#F5F5F0',
            borderColor: 'rgba(0, 78, 196, 0.99)',
            backgroundColor: 'rgba(0, 78, 196, 0.41)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          {item.label}
        </motion.button>
      ))}
    </div>
  )
}

// Hero section 
export default function Hero() {
  const [cidx, setCidx] = useState(0)
  const [chars, setChars] = useState(0)
  const [visible, setVisible] = useState(true)

  const concept = CONCEPTS[cidx]
  const fullText = concept.text

  useEffect(() => {
    if (!visible) return
    if (chars < fullText.length) {
      const t = setTimeout(() => setChars((c) => c + 1), TYPING_SPEED)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setCidx((i) => (i + 1) % CONCEPTS.length)
        setChars(0)
        setVisible(true)
      }, FADE_OUT)
    }, PAUSE_AFTER)
    return () => clearTimeout(t)
  }, [chars, fullText, visible])

  const goto = (section) =>
    document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: '#0D1117' }}
    >
      {/* Starfield con cruces */}
      <StarCanvas />

      {/* Blaugrana radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 50% 35% at 30% -8%, rgba(0,79,196,0.14) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 30% at 70% -5%, rgba(165,0,68,0.09) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center space-y-5">

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-mono text-xs sm:text-sm tracking-widest uppercase"
          style={{ color: BLU }}
        >
          Desarrollador Full-Stack JR
        </motion.p>

        {/* Name + avatar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          {/* Avatar circular */}
          <div className="relative flex-shrink-0">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2"
              style={{ borderColor: 'rgba(0,79,196,0.6)' }}
            >
              <img
                src={fotoPerfil}
                alt="Pedro Julio Caso"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: '0 0 16px rgba(0,79,196,0.45), 0 0 40px rgba(0,79,196,0.15)' }}
            />
          </div>

          <h1
            className="text-4xl sm:text-6xl font-bold leading-tight"
            style={{ color: '#F5F5F0' }}
          >
            Pedro Julio Caso
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm sm:text-base"
          style={{ color: '#8B949E' }}
        >
          Ingeniería en Ciencias de la Computación &nbsp;·&nbsp; UVG
        </motion.p>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: BLU }} />
          <span className="font-mono text-xs sm:text-sm" style={{ color: BLU }}>
            Disponible para trabajar
          </span>
        </motion.div>

        {/* Animated CS concept */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="relative flex items-center justify-center h-10 sm:h-12"
        >
          <AnimatePresence mode="wait">
            {visible && (
              <motion.div
                key={cidx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="flex items-center gap-2 font-mono text-sm sm:text-base"
              >
                <span
                  className="font-bold select-none flex-shrink-0 text-base sm:text-lg"
                  style={{ color: concept.color }}
                >
                  {concept.prefix}
                </span>
                <span style={{ color: concept.color }}>
                  {fullText.slice(0, chars)}
                </span>
                {chars < fullText.length && (
                  <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.45, 0.5, 0.95] }}
                    className="inline-block w-[7px] h-[15px] rounded-[2px] align-middle"
                    style={{ backgroundColor: concept.color }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress dots — blaugrana */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center justify-center gap-1.5"
        >
          {CONCEPTS.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === cidx ? '16px' : '5px',
                height: '5px',
                backgroundColor: i === cidx
                  ? (cidx % 2 === 0 ? BLU : RED)
                  : 'rgba(255,255,255,0.13)',
              }}
            />
          ))}
        </motion.div>

        {/* Nav buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.25 }}
        >
          <NavButtons items={NAV_ITEMS} goto={goto} />
        </motion.div>
      </div>
    </section>
  )
}
