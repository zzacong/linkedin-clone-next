import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export function withAuthApi(
  callback: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (session) {
      return callback(req, res)
    } else {
      return res.status(401).end()
    }
  }
}
