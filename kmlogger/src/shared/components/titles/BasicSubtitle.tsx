import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Separator } from '../separator/Separator'

const obterSeparadorVariantes = cva('', {
  variants: {
    separador: {
      default: 'bg-foreground/10',
    },
  },
  defaultVariants: {
    separador: 'default',
  },
})

interface Props {
  'className'?: string
  'classNameSeparador'?: string
  'titulo': React.ReactNode
  'data-testid'?: string
  'comSeparador'?: boolean
  'variantesSeparador'?: VariantProps<typeof obterSeparadorVariantes>
}

function BasicSubtitle({
  titulo,
  className,
  'data-testid': dataTestId,
  comSeparador,
  variantesSeparador,
  classNameSeparador,
}: Props) {
  return (
    <div
      data-testid={dataTestId}
      className={twMerge('hp text-xs sm:text-base sm:mb-0', className)}
    >
      {titulo}
      {comSeparador && (
        <Separator
          className={twMerge(
            obterSeparadorVariantes(variantesSeparador),
            classNameSeparador
          )}
        />
      )}
    </div>
  )
}

export default BasicSubtitle
