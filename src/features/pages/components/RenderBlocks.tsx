import React from 'react'
import { blockRegistry } from '../BlockRegistry'

type RenderBlocksProps = {
  blocks?: any[]
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        const blockType = block.blockType
        if (!blockType) {
          return null
        }

        const Component = blockRegistry[blockType]
        if (!Component) {
          console.warn(`No component registered for blockType: ${blockType}`)
          return null
        }

        return <Component key={`${blockType}-${index}`} {...block} />
      })}
    </>
  )
}
