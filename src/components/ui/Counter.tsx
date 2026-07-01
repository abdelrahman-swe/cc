'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current

    if (!node || !isInView) {
      return
    }

    if (shouldReduceMotion) {
      node.textContent = String(value)
      return
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate(latest) {
        node.textContent = String(Math.round(latest))
      }
    })

    return () => controls.stop()
  }, [isInView, shouldReduceMotion, value])

  return (
    <span className="inline-flex items-center" dir="ltr">
      {suffix && <span className="text-[#243A77] inline-block">{suffix}</span>}
      <span ref={ref}>0</span>
    </span>
  )
}
