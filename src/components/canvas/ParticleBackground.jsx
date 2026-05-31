import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef(null)
  const dotsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const SPACING = 28
    const DOT_RADIUS = 1.3
    const MOUSE_RADIUS = 140
    const BASE_OPACITY = 0.08
    const MAX_OPACITY = 0.8
    const LERP_SPEED = 0.08
    const COLOR = '#20E3B2'

    const buildGrid = () => {
      const dots = []
      const cols = Math.ceil(canvas.width / SPACING) + 1
      const rows = Math.ceil(canvas.height / SPACING) + 1
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({ x: col * SPACING, y: row * SPACING, opacity: BASE_OPACITY, targetOpacity: BASE_OPACITY })
        }
      }
      dotsRef.current = dots
    }

    const draw = () => {
      const ctx = canvas.getContext('2d')
      const { x: mx, y: my } = mouseRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx
        const dy = dot.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS) {
          const proximity = 1 - dist / MOUSE_RADIUS
          dot.targetOpacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * proximity * proximity
        } else {
          dot.targetOpacity = BASE_OPACITY
        }

        dot.opacity += (dot.targetOpacity - dot.opacity) * LERP_SPEED

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = COLOR
        ctx.globalAlpha = dot.opacity
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animFrameRef.current = requestAnimationFrame(draw)
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildGrid()
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
