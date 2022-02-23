import { prisma } from '$lib/config/prisma'
import { withAuthApi } from '$lib/utils/api'

export default withAuthApi(async ({ method, body, query }, res) => {
  const { id } = query
  const { photoUrl } = body

  if (method === 'PATCH') {
    if (!photoUrl?.trim?.()) return res.status(400).end()

    try {
      const posts = await prisma.post.update({
        where: { id: +id },
        data: { photoUrl: body.photoUrl },
      })
      return res.status(200).json(posts)
    } catch (error) {
      console.error(error)
      return res.status(500).json(error)
    }
  }

  if (method === 'DELETE') {
    try {
      await prisma.post.delete({ where: { id: +id } })
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  return res.status(405).end()
})
