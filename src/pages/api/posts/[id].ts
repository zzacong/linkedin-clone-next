import { z } from 'zod'
import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'

export default withAuthApi(async ({ method, body, query }, res) => {
  try {
    const id = z.string().parse(query.id)

    if (method === 'GET') {
      try {
        const post = await prisma.post.findUnique({
          where: { id: +id },
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
        return res.status(200).json(post)
      } catch (error) {
        console.error(error)
        return res.status(500).json(error)
      }
    }

    if (method === 'PATCH') {
      try {
        const photoUrl = z.string().url().parse(body.photoUrl)
        const post = await prisma.post.update({
          where: { id: +id },
          data: { photoUrl },
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
        return res.status(200).json(post)
      } catch (error) {
        console.error(error)
        if (error instanceof z.ZodError) return res.status(400).json(error)
        return res.status(500).json(error)
      }
    }

    if (method === 'DELETE') {
      try {
        const post = await prisma.post.delete({ where: { id: +id } })
        return res.status(200).json(post)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(404).json(error)
  }

  return res.status(405).end()
})
