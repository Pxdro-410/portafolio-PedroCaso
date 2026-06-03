import { useEffect, useRef } from 'react'

/**
 * HeroParticles
 * Canvas con cruces (+) flotantes iluminadas que se mueven de forma autónoma y
 * se conectan con líneas cuando están cerca (efecto constelación).
 * Solo se renderiza en el viewport del Hero.
 */

const PARTICLE_COUNT = 50
const CONNECTION_DIST = 120
const BLAUGRANA_BLUE = '0, 79, 196'

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function createParticle(w, h) {
  const speed = rand(0.12, 0.45)
  const angle = rand(0, Math.PI * 2)
  return {
    x: rand(0, w),
    y: rand(0, h),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: rand(3, 7),       // tamaño del brazo de la cruz
    thickness: rand(0.8, 1.6), // grosor de la línea de la cruz
    opacity: rand(0.2, 0.65),
    // pulso individual
    pulseOffset: rand(0, Math.PI * 2),
    pulseSpeed: rand(0.007, 0.018),
  }
}

/**
 * Dibuja una cruz (+) iluminada en (x, y) con el tamaño y opacidad dados.
 * El "glow" se consigue pintando la misma cruz varias veces con
 * líneas más anchas y opacidad reducida antes de la línea principal.
 */
function drawCross(ctx, x, y, size, thickness, color, opacity) {
  // Glow exterior (difuso)
  ctx.save()
  ctx.lineCap = 'round'

  // Capa de glow más grande
  ctx.globalAlpha = opacity * 0.18
  ctx.strokeStyle = `rgba(${color}, 1)`
  ctx.lineWidth = thickness * 5
  ctx.beginPath()
  ctx.moveTo(x - size * 1.8, y)
  ctx.lineTo(x + size * 1.8, y)
  ctx.moveTo(x, y - size * 1.8)
  ctx.lineTo(x, y + size * 1.8)
  ctx.stroke()

  // Capa de glow medio
  ctx.globalAlpha = opacity * 0.32
  ctx.lineWidth = thickness * 2.5
  ctx.beginPath()
  ctx.moveTo(x - size * 1.3, y)
  ctx.lineTo(x + size * 1.3, y)
  ctx.moveTo(x, y - size * 1.3)
  ctx.lineTo(x, y + size * 1.3)
  ctx.stroke()

  // Línea principal 
  ctx.globalAlpha = Math.max(0.08, opacity)
  ctx.lineWidth = thickness
  ctx.beginPath()
  ctx.moveTo(x - size, y)
  ctx.lineTo(x + size, y)
  ctx.moveTo(x, y - size)
  ctx.lineTo(x, y + size)
  ctx.stroke()

  ctx.restore()
}

export default function HeroParticles() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const frameRef = useRef(null)
  const tickRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // reiniciar partículas al cambiar tamaño
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height)
      )
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      tickRef.current++

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current

      // Dibujar conexiones entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${BLAUGRANA_BLUE}, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Mover y dibujar cruces
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges (suave)
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        // Pulso de opacidad
        const pulse = Math.sin(tickRef.current * p.pulseSpeed + p.pulseOffset)
        const currentOpacity = p.opacity + pulse * 0.15

        drawCross(
          ctx,
          p.x,
          p.y,
          p.size,
          p.thickness,
          BLAUGRANA_BLUE,
          Math.max(0.05, currentOpacity)
        )
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
