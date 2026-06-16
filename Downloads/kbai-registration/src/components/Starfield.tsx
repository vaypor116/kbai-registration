'use client'

import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    type Star = { x: number; y: number; r: number; a: number; speed: number; drift: number }
    let stars: Star[] = []
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        speed: Math.random() * 0.4 + 0.05,
        drift: (Math.random() - 0.5) * 0.2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now() / 1000
      stars.forEach(s => {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,160,255,${0.3 + 0.7 * Math.abs(Math.sin(now + s.x))})`
        ctx.fill()
        s.y += s.speed
        s.x += s.drift
        if (s.y > canvas.height) {
          s.y = 0
          s.x = Math.random() * canvas.width
        }
      })
      animId = requestAnimationFrame(draw)
    }

    resize()
    initStars()
    draw()
    window.addEventListener('resize', () => { resize(); initStars() })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', () => { resize(); initStars() })
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
