import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'

export default withAuthApi(async ({ method, body }, res, session) => {
  const { input, authorId, photoUrl } = body

  // Get all posts
  if (method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              email: true,
              id: true,
              image: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
      res.status(200).json(posts)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  }

  // Create a new post
  if (method === 'POST') {
    if (!input?.trim?.()) return res.status(400).end()

    try {
      const post = await prisma.post.create({
        data: {
          input: input.trim(),
          authorId: session?.user?.uid ?? '',
          photoUrl: photoUrl?.trim?.(),
        },
        select: { id: true },
      })
      res.status(201).json(post)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  }

  return res.status(405).end()
})
