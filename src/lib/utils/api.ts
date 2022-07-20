import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '$pages/api/auth/[...nextauth]'

export function withAuthApi(
  callback: (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
  ) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session?.user) {
      return callback(req, res, session)
    } else {
      return res.status(401).end()
    }
  }
}
