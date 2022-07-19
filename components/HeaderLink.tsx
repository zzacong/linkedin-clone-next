import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

const Avatar = dynamic(() => import('$components/Avatar'))

export default function HeaderLink({
  children,
  Icon,
  avatar = false,
  feed = false,
  active = false,
  hidden = false,
}: Props) {
  return (
    <a
      href="#"
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center',
        feed && 't-secondary hover:text-black dark:hover:text-white',
        !feed && 'text-gray-500 hover:text-gray-700',
        hidden && 'hidden md:inline-flex',
        active && 'text-black dark:text-white'
      )}
    >
      {avatar ? (
        <Avatar size={24} />
      ) : Icon ? (
        <Icon className="mui-icon" />
      ) : null}

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
    </a>
  )
}

type Props = {
  Icon?: React.FC<{ className: string }>
  avatar?: boolean
  children: ReactNode
  feed?: boolean
  active?: boolean
  hidden?: boolean
}
