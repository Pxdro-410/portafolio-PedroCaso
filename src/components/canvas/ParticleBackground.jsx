import { useEffect, useRef, useCallback } from 'react'

/**
 * ParticleBackground
 * Grid of dots that illuminate when the cursor approaches them.
 * Implemented with HTML5 Canvas 2D API + requestAnimationFrame.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef(null)
  const dotsRef = useRef([])

  const SPACING = 28       // px between dots
  const DOT_RADIUS = 1.3   // base dot radius
  const MOUSE_RADIUS = 140 // illumination radius
  const BASE_OPACITY = 0.10
  const MAX_OPACITY = 0.85
  const LERP_SPEED = 0.08  // animation smoothness (0 = instant, 1 = none)

  // Color interpolation: base gray → indigo/cyan depending on position
  const getColor = useCallback((dot, canvasWidth) => {
    const t = dot.x / canvasWidth // 0..1 across the page
    // Interpolate between indigo (#6366F1) and cyan (#22D3EE)
    const r = Math.round(99 + (34 - 99) * t)
    const g = Math.round(102 + (211 - 102) * t)
    const b = Math.round(241 + (238 - 241) * t)
    return `rgb(${r},${g},${b})`
  }, [])

  const buildGrid = useCallback((canvas) => {
    const dots = []
    const cols = Math.ceil(canvas.width / SPACING) + 1
    const rows = Math.ceil(canvas.height / SPACING) + 1

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * SPACING,
          y: row * SPACING,
          opacity: BASE_OPACITY,
          targetOpacity: BASE_OPACITY,
        })
      }
    }
    dotsRef.current = dots
  }, [SPACING, BASE_OPACITY])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { x: mx, y: my } = mouseRef.current
    const w = canvas.width

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const dot of dotsRef.current) {
      const dx = dot.x - mx
      const dy = dot.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Calculate target opacity based on distance from mouse
      if (dist < MOUSE_RADIUS) {
        const proximity = 1 - dist / MOUSE_RADIUS  // 0..1
        dot.targetOpacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * proximity * proximity
      } else {
        dot.targetOpacity = BASE_OPACITY
      }

      // Smooth lerp toward target
      dot.opacity += (dot.targetOpacity - dot.opacity) * LERP_SPEED

      // Draw dot
      const color = getColor(dot, w)
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.globalAlpha = dot.opacity
      ctx.fill()
    }

    ctx.globalAlpha = 1
    animFrameRef.current = requestAnimationFrame(draw)
  }, [BASE_OPACITY, MAX_OPACITY, MOUSE_RADIUS, LERP_SPEED, DOT_RADIUS, getColor])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildGrid(canvas)
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
  }, [buildGrid, draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
