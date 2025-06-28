import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Separator } from '../separator/Separator'
import BasicSubtitle from './BasicSubtitle'

const getSeparatorVariants = cva('', {
  variants: {
    separator: {
      default: 'bg-foreground/10 mt-1 mb-5',
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
  'subtitle'?: React.ReactNode
  'data-testid'?: string
  'withSeparator'?: boolean
  'separatorVariants'?: VariantProps<typeof getSeparatorVariants>
  'size'?: 'base' | 'sm'
}

function BasicTitle({
  title,
  className,
  'data-testid': dataTestId,
  withSeparator,
  separatorVariants,
  separatorClassName,
  size,
  subtitle,
}: Props) {
  return (
    <div
      data-testid={dataTestId}
      className={twMerge(
        `
        ${
          size === 'sm'
            ? '~text-xs/base sm:~text-lg/xl'
            : '~text-base/base sm:~text-lg/2xl'
        }
        font-medium leading-9 tracking-tight`,
        className
      )}
    >
      {title}
      {subtitle && <BasicSubtitle title={subtitle} />}
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

export default BasicTitle