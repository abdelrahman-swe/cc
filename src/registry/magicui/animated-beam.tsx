"use client"

import { useEffect, useId, useState, type RefObject } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null> // Container ref
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  repeat?: number
  repeatDelay?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const [coords, setCoords] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 })

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset

        const controlY = startY - curvature
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
        setPathD(d)
        setCoords({ startX, startY, endX, endY })
      }
    }

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updatePath()
    })

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Call the updatePath initially to set the initial path
    updatePath()

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect()
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  const dx = coords.endX - coords.startX
  const dy = coords.endY - coords.startY
  const distance = Math.sqrt(dx * dx + dy * dy)

  const ux = distance > 0 ? dx / distance : 0
  const uy = distance > 0 ? dy / distance : 0

  const beamLength = Math.min(150, distance * 0.4)

  const startX1 = coords.startX - ux * beamLength
  const startY1 = coords.startY - uy * beamLength
  const startX2 = coords.startX
  const startY2 = coords.startY

  const endX1 = coords.endX
  const endY1 = coords.endY
  const endX2 = coords.endX + ux * beamLength
  const endY2 = coords.endY + uy * beamLength

  const x1Array = reverse ? [endX1, startX1] : [startX1, endX1]
  const y1Array = reverse ? [endY1, startY1] : [startY1, endY1]
  const x2Array = reverse ? [endX2, startX2] : [startX2, endX2]
  const y2Array = reverse ? [endY2, startY2] : [startY2, endY2]

  const isInitialized = coords.startX !== 0 || coords.startY !== 0 || coords.endX !== 0 || coords.endY !== 0

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      {isInitialized && (
        <path
          d={pathD}
          strokeWidth={pathWidth}
          stroke={`url(#${id})`}
          strokeOpacity="1"
          strokeLinecap="round"
        />
      )}
      <defs>
        {isInitialized && (
          <motion.linearGradient
            className="transform-gpu"
            id={id}
            gradientUnits={"userSpaceOnUse"}
            initial={{
              x1: reverse ? endX1 : startX1,
              x2: reverse ? endX2 : startX2,
              y1: reverse ? endY1 : startY1,
              y2: reverse ? endY2 : startY2,
            }}
            animate={{
              x1: x1Array,
              x2: x2Array,
              y1: y1Array,
              y2: y2Array,
            }}
            transition={{
              delay,
              duration,
              ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
              repeat,
              repeatDelay,
            }}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
            <stop stopColor={gradientStartColor}></stop>
            <stop offset="32.5%" stopColor={gradientStopColor}></stop>
            <stop
              offset="100%"
              stopColor={gradientStopColor}
              stopOpacity="0"
            ></stop>
          </motion.linearGradient>
        )}
      </defs>
    </svg>
  )
}
