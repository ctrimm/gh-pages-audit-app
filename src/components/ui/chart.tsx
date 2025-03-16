"use client"

import * as React from "react"
import { ResponsiveContainer } from "recharts"

export type ChartConfig = {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactElement
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={className}
      style={{
        "--chart-1": "215 25% 27%",
        "--chart-2": "142 72% 29%",
        "--chart-3": "198 93% 60%",
        "--chart-4": "254 75% 57%",
        "--chart-5": "360 71% 65%",
      } as React.CSSProperties}
      {...props}
    >
      <ResponsiveContainer width="100%" height={350}>
        {children}
      </ResponsiveContainer>
    </div>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
  hideLabel?: boolean
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
}: ChartTooltipContentProps) {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && <div className="font-medium">{label}</div>}
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div className="font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export { Tooltip as ChartTooltip } from "recharts"
