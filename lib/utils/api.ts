import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

export function withAuthApi(
  callback: (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
  ) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (session?.user) {
      return callback(req, res, session)
    } else {
      return res.status(401).end()
    }
  }
}
