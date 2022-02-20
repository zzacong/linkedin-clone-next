import { UserIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

export default function Avatar({ className }: { className: string }) {
  return (
    <span
      className={clsx(
        'inline-block rounded-full bg-gray-300 p-[2px]',
        className
      )}
    >
      <UserIcon className="rounded-full text-white" />
    </span>
  )
}
