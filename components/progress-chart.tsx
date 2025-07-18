"use client"

import { useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function ProgressChart() {
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

    // Mock data for interview scores over time
    const data = [
      { date: "Mar 15", score: 65 },
      { date: "Mar 22", score: 68 },
      { date: "Mar 29", score: 72 },
      { date: "Apr 5", score: 70 },
      { date: "Apr 12", score: 78 },
    ]

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = rect.height
    const padding = isMobile ? 20 : 40

    // Calculate scales
    const xScale = (chartWidth - padding * 2) / (data.length - 1)
    const yScale = (chartHeight - padding * 2) / 100

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 100; i += 20) {
      const y = chartHeight - padding - i * yScale
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(chartWidth - padding, y)
      ctx.stroke()
    }

    // Draw axes labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels
    data.forEach((point, i) => {
      const x = padding + i * xScale
      ctx.fillText(point.date, x, chartHeight - padding / 2)
    })

    // Y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 100; i += 20) {
      const y = chartHeight - padding - i * yScale
      ctx.fillText(`${i}%`, padding - 10, y + 4)
    }

    // Draw line
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()
    data.forEach((point, i) => {
      const x = padding + i * xScale
      const y = chartHeight - padding - point.score * yScale
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw points
    ctx.fillStyle = "#ffffff"
    data.forEach((point, i) => {
      const x = padding + i * xScale
      const y = chartHeight - padding - point.score * yScale
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 3
      ctx.stroke()
    })

    // Draw score labels
    ctx.fillStyle = "#1f2937"
    ctx.textAlign = "center"
    data.forEach((point, i) => {
      const x = padding + i * xScale
      const y = chartHeight - padding - point.score * yScale - 15
      ctx.fillText(`${point.score}%`, x, y)
    })
  }, [isMobile])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
