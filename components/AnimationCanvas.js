"use client"
import { useEffect, useRef } from "react"

export default function AnimationCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const hearts = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 1 + 0.5
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      hearts.forEach(h => {
        ctx.font = `${h.size}px serif`
        ctx.fillText("❤️", h.x, h.y)
        h.y += h.speed
        if (h.y > canvas.height) h.y = -20
      })
      requestAnimationFrame(draw)
    }
    draw()
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}
