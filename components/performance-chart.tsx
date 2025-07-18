"use client"

import { useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function PerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Mock data for performance metrics
    const data = [
      { label: "Technical Knowledge", value: 82, color: "#3b82f6" },
      { label: "Communication", value: 75, color: "#8b5cf6" },
      { label: "Problem Solving", value: 78, color: "#10b981" },
      { label: "Confidence", value: 68, color: "#f59e0b" },
      { label: "Body Language", value: 72, color: "#ef4444" },
    ]

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = rect.height
    const centerX = chartWidth / 2
    const centerY = chartHeight / 2
    const radius = Math.min(centerX, centerY) - (isMobile ? 50 : 80)

    // Draw radar background
    const angleStep = (Math.PI * 2) / data.length

    // Draw radar grid
    for (let r = 0.2; r <= 1; r += 0.2) {
      ctx.beginPath()
      for (let i = 0; i < data.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + Math.cos(angle) * radius * r
        const y = centerY + Math.sin(angle) * radius * r
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = "#e5e7eb"
      ctx.stroke()
    }

    // Draw radar axes
    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.strokeStyle = "#e5e7eb"
      ctx.stroke()

      // Draw labels
      const labelX = centerX + Math.cos(angle) * (radius + (isMobile ? 15 : 30))
      const labelY = centerY + Math.sin(angle) * (radius + (isMobile ? 15 : 30))
      ctx.fillStyle = "#6b7280"
      ctx.font = `${isMobile ? 10 : 12}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(data[i].label, labelX, labelY)
    }

    // Draw data
    ctx.beginPath()
    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = data[i].value / 100
      const x = centerX + Math.cos(angle) * radius * value
      const y = centerY + Math.sin(angle) * radius * value
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
    ctx.fill()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = data[i].value / 100
      const x = centerX + Math.cos(angle) * radius * value
      const y = centerY + Math.sin(angle) * radius * value

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.strokeStyle = data[i].color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw value labels
      const valueX = centerX + Math.cos(angle) * radius * value * 0.85
      const valueY = centerY + Math.sin(angle) * radius * value * 0.85
      ctx.fillStyle = "#1f2937"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${data[i].value}%`, valueX, valueY)
    }
  }, [isMobile])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
