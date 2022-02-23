import type { Post } from '@prisma/client'

export default function Post({ post }: Props) {
  return (
    <div>
      {post?.id} - {post?.input}
    </div>
  )
}

type Props = {
  post: Post
}
