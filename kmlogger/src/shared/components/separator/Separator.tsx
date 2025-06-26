'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

const separatorVariants = cva('shrink-0 bg-border rounded-2xl', {
  variants: {
    orientation: {
      horizontal: 'h-[4px] w-full',
      vertical: 'h-full w-[2px]',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

function Separator({
  ref,
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof SeparatorPrimitive.Root> | null>
}) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  )
}

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
