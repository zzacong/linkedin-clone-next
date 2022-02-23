import Image from 'next/image'
import { MdPerson } from 'react-icons/md'
import { useSession } from 'next-auth/react'

export default function Avatar({ size }: Props) {
  const { data: session } = useSession()

  if (!session?.user?.image) return <AvatarBlank size={size} />

  return (
    <Image
      src={session.user.image}
      alt={session.user.name ?? 'Profile picture'}
      width={size}
      height={size}
      className="rounded-full"
    />
  )
}

export function AvatarBlank({ size }: Props) {
  return (
    <span className="block rounded-full bg-gray-300 p-[2px]">
      <MdPerson className="rounded-full text-white" size={size - 4} />
    </span>
  )
}

type Props = {
  size: number
}
