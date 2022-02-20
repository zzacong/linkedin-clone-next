import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import clsx from 'clsx'

export default function HeaderLink({
  children,
  Icon,
  avatar = false,
  feed = false,
  active = false,
  hidden = false,
}: Props) {
  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center',
        feed &&
          'text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white',
        !feed && 'text-gray-500 hover:text-gray-700',
        hidden && 'hidden md:inline-flex',
        active && 'text-black dark:text-white'
      )}
    >
      {avatar ? (
        <Icon className="h-7 w-7 lg:-mb-1" />
      ) : (
        <Icon className="mui-icon" />
      )}

      <h4
        className={clsx(
          'pt-1 text-sm',
          feed && 'mx-auto hidden w-full justify-center lg:flex'
        )}
      >
        {children}
      </h4>

      {active && (
        <span className="hidden h-0.5 w-[calc(100%+20px)] rounded-t-full bg-black dark:bg-white lg:inline-flex" />
      )}
    </div>
  )
}

type Props = {
  Icon: React.FC<{ className: string }>
  children: ReactNode
  avatar?: boolean
  feed?: boolean
  active?: boolean
  hidden?: boolean
}
