import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeIDToken } from 'services/helper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const decodeToken = await decodeIDToken(req, res)
    if (decodeToken.success) {
      return res.status(200).json({
        status: 200,
        message: 'success Authorized',
        data: {
          name: decodeToken.data.name,
          picture: decodeToken.data.picture,
          email: decodeToken.data.email,
          sub: decodeToken.data.sub,
        }
      })
    }
    throw decodeToken.data
  } catch (err: any) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
      data: {
        error: err.message,
      },
    })
  }
}