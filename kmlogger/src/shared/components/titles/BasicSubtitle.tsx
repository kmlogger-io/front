import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Separator } from '../separator/Separator'

const getSeparatorVariants = cva('', {
  variants: {
    separator: {
      default: 'bg-foreground/10',
    },
  },
  defaultVariants: {
    separator: 'default',
  },
})

interface Props {
  'className'?: string
  'separatorClassName'?: string
  'title': React.ReactNode
  'data-testid'?: string
  'withSeparator'?: boolean
  'separatorVariants'?: VariantProps<typeof getSeparatorVariants>
}

function BasicSubtitle({
  title,
  className,
  'data-testid': dataTestId,
  withSeparator,
  separatorVariants,
  separatorClassName,
}: Props) {
  return (
    <div
      data-testid={dataTestId}
      className={twMerge('hp text-xs sm:text-base sm:mb-0', className)}
    >
      {title}
      {withSeparator && (
        <Separator
          className={twMerge(
            getSeparatorVariants(separatorVariants),
            separatorClassName
          )}
        />
      )}
    </div>
  )
}

export default BasicSubtitle