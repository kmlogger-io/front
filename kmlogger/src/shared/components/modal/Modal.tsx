import type { ReactElement } from 'react'
import { IconLogout } from '@tabler/icons-react'
import classNames from 'classnames'
import { Button, type ButtonProps } from '../button/button'
import BasicTitle from '../titles/BasicTitle'
import ButtonClose from './buttons/ButtonClose'

interface Props {
  titleIcon?: ReactElement<any>
  title: string
  description: ReactElement<any>
  onContinue: () => void
  onClose: () => void
  buttons?: ReactElement<any>
  backgroundColor?: string
  titleColor?: string
  iconColor?: string
  buttonVariant?: ButtonProps['variant']
}

export default function Modal({
  onClose,
  onContinue,
  iconColor,
  titleIcon,
  title,
  description,
  buttons,
  titleColor,
  backgroundColor,
  buttonVariant,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-3 relative">
      <div
        className={classNames(
          'rounded-[5rem] w-24 h-24 flex items-center justify-center shadow-elevation-medium absolute -top-14 z-index-[2000]',
          backgroundColor ?? 'bg-primary'
        )}
      >
        {titleIcon ?? (
          <IconLogout
            className={iconColor ?? 'text-primary-foreground'}
            size={52}
          />
        )}
      </div>
      <div className="absolute -right-3 -top-3" onClick={onClose}>
        <ButtonClose />
      </div>
      <BasicTitle
        title={title}
        className={classNames(
          '~text-2xl/4xl font-medium mt-12',
          titleColor ?? 'text-primary'
        )}
      />
      {description}
      {buttons ?? (
        <Button
          variant={buttonVariant}
          className="px-4 py-1 mb-2"
          onClick={onContinue}
        >
          Continue
        </Button>
      )}
    </div>
  )
}