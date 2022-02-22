import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'

export default withAuthApi(
  async ({ method, body }: NextApiRequest, res: NextApiResponse) => {
    const { input, authorId, photoUrl } = body

    // Get all posts
    if (method === 'GET') {
      try {
        const posts = await prisma.post.findMany({
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
      if (!input?.trim?.() || !authorId?.trim?.()) return res.status(400).end()

      try {
        const post = await prisma.post.create({
          data: {
            input: input.trim(),
            authorId: authorId.trim(),
            photoUrl: photoUrl?.trim?.(),
          },
          select: { authorId: true },
        })
        res.status(201).json(post)
      } catch (error) {
        console.error(error)
        res.status(500).json(error)
      }
    }

    return res.status(405).end()
  }
)
