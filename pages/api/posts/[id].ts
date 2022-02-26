import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'

export default withAuthApi(async ({ method, body, query }, res) => {
  const { id } = query
  const { photoUrl } = body

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
    if (!photoUrl?.trim?.()) return res.status(400).end()

    try {
      const post = await prisma.post.update({
        where: { id: +id },
        data: { photoUrl: body.photoUrl },
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

  if (method === 'DELETE') {
    try {
      const post = await prisma.post.delete({ where: { id: +id } })
      return res.status(200).json(post)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  return res.status(405).end()
})
