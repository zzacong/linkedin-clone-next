import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'

export default withAuthApi(async ({ method, body }, res, session) => {
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
    try {
      const { input, photoUrl } = z
        .object({
          input: z.string().min(1).trim(),
          photoUrl: z.string().url().optional(),
        })
        .parse(body)

      try {
        const post = await prisma.post.create({
          data: {
            input,
            photoUrl,
            authorId: session?.user?.uid ?? '',
          },
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
        })
        res.status(201).json(post)
      } catch (error) {
        console.error(error)
        res.status(500).json(error)
      }
    } catch (error) {
      console.error(error)
      return res.status(400).json(error)
    }
  }

  return res.status(405).end()
})
