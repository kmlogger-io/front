import { IconX } from '@tabler/icons-react'
import classNames from 'classnames'

interface Props {
  className?: string
  onClick?: () => void
}

export default function ButtonClose({ className, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'w-8 h-8 shadow-elevation-medium rounded-[0.3rem] flex items-center justify-center cursor-pointer hover:translate-y-1 transition-transform',
        className
      )}
    >
      <IconX size={20} />
    </div>
  )
}