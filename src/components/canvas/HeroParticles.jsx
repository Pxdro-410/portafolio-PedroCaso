import { useEffect, useRef } from 'react'

/**
 * HeroParticles
 * Canvas con partículas flotantes que se mueven de forma autónoma y
 * se conectan con líneas cuando están cerca (efecto constelación).
 * Solo se renderiza en el viewport del Hero.
 */

const PARTICLE_COUNT = 55
const CONNECTION_DIST = 120 // px para dibujar línea entre partículas
const MINT = '32, 227, 178' // rgb sin #, para usar en rgba()

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function createParticle(w, h) {
  const speed = rand(0.15, 0.5)
  const angle = rand(0, Math.PI * 2)
  return {
    x: rand(0, w),
    y: rand(0, h),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: rand(1, 2.2),
    opacity: rand(0.25, 0.7),
    // pulso individual
    pulseOffset: rand(0, Math.PI * 2),
    pulseSpeed: rand(0.008, 0.02),
  }
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

      // Mover partículas
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges (suave)
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Pulso de opacidad
        const pulse = Math.sin(tickRef.current * p.pulseSpeed + p.pulseOffset)
        const currentOpacity = p.opacity + pulse * 0.12

        // Dibujar partícula
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${MINT}, ${Math.max(0.1, currentOpacity)})`
        ctx.fill()
      }

      // Dibujar conexiones entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${MINT}, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
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
