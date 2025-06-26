import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Separator } from '../separator/Separator'
import BasicSubtitle from './BasicSubtitle'

const obterSeparadorVariantes = cva('', {
  variants: {
    separador: {
      default: 'bg-foreground/10 mt-1 mb-5',
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
  'subtitulo'?: React.ReactNode
  'data-testid'?: string
  'comSeparador'?: boolean
  'variantesSeparador'?: VariantProps<typeof obterSeparadorVariantes>
  'tamanho'?: 'base' | 'sm'
}

function TituloNightsable({
  titulo,
  className,
  'data-testid': dataTestId,
  comSeparador,
  variantesSeparador,
  classNameSeparador,
  tamanho,
  subtitulo,
}: Props) {
  return (
    <div
      data-testid={dataTestId}
      className={twMerge(
        `
        ${
          tamanho === 'sm'
            ? '~text-xs/base sm:~text-lg/xl'
            : '~text-base/base sm:~text-lg/2xl'
        }
        font-medium leading-9 tracking-tight`,
        className
      )}
    >
      {titulo}
      {subtitulo && <BasicSubtitle titulo={subtitulo} />}
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

export default TituloNightsable
