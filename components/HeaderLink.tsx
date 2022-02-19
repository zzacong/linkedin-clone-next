import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import clsx from 'clsx'

export default function HeaderLink({
  children,
  Icon,
  avatar = false,
  feed = false,
}: Props) {
  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center',
        feed &&
          'text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white',
        !feed && 'text-gray-500 hover:text-gray-700'
      )}
    >
      {avatar ? (
        <Icon className="!h-7 !w-7 lg:!-mb-1" />
      ) : (
        <Icon className="mui-icon" />
      )}
      <h4 className="text-sm">{children}</h4>
    </div>
  )
}

type Props = {
  Icon: IconType
  children: ReactNode
  avatar?: boolean
  feed?: boolean
}
