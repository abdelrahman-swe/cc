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
      node.textContent = `${value}${suffix}`
      return
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate(latest) {
        node.textContent = `${Math.round(latest)}${suffix}`
      }
    })

    return () => controls.stop()
  }, [isInView, shouldReduceMotion, suffix, value])

  return <span ref={ref}>0{suffix}</span>
}
