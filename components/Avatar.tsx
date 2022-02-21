import Image from 'next/image'
import { MdPerson } from 'react-icons/md'
import { useSession } from 'next-auth/react'

export default function Avatar({ w, h }: Props) {
  const { data: session } = useSession()

  if (!session?.user?.image) return <AvatarBlank w={w} h={h} />

  return (
    <Image
      src={session.user.image}
      alt={session.user.name ?? 'Profile picture'}
      width={w}
      height={h}
      className="rounded-full"
    />
  )
}

export function AvatarBlank({ w }: Props) {
  return (
    <span className="block rounded-full bg-gray-300 p-[2px]">
      <MdPerson className="rounded-full text-white" size={w - 4} />
    </span>
  )
}

type Props = {
  w: number
  h: number
}
