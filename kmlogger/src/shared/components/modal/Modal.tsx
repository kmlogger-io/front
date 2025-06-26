import type { ReactElement } from 'react'
import { IconLogout } from '@tabler/icons-react'
import classNames from 'classnames'
import { Button, type ButtonProps } from '../button/button'
import BasicTitle from '../titles/BasicTitle'
import ButtonClose from './buttons/ButtonClose'

interface Props {
  iconeTitulo?: ReactElement<any>
  titulo: string
  descricao: ReactElement<any>
  aoContinuar: () => void
  aoFechar: () => void
  botoes?: ReactElement<any>
  corBackground?: string
  corTitulo?: string
  corIcone?: string
  varianteBotao?: ButtonProps['variant']
}

export default function Modal({
  aoFechar,
  aoContinuar,
  corIcone,
  iconeTitulo,
  titulo,
  descricao,
  botoes,
  corTitulo,
  corBackground,
  varianteBotao,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-3 relative">
      <div
        className={classNames(
          'rounded-[5rem] w-24 h-24 flex items-center justify-center shadow-elevation-medium absolute -top-14 z-index-[2000]',
          corBackground ?? 'bg-primary'
        )}
      >
        {iconeTitulo ?? (
          <IconLogout
            className={corIcone ?? 'text-primary-foreground'}
            size={52}
          />
        )}
      </div>
      <div className="absolute -right-3 -top-3" onClick={aoFechar}>
        <ButtonClose />
      </div>
      <BasicTitle
        titulo={titulo}
        className={classNames(
          '~text-2xl/4xl font-medium mt-12',
          corTitulo ?? 'text-primary'
        )}
      />
      {descricao}
      {botoes ?? (
        <Button
          variant={varianteBotao}
          className="px-4 py-1 mb-2"
          onClick={aoContinuar}
        >
          Continuar
        </Button>
      )}
    </div>
  )
}
