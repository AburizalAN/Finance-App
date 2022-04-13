import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'services/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req
  const { tagId = null }: { tagId?: any } = query

  if (method === 'GET') {
    try {
      const snapshot = await db.collection('tags').doc(tagId).get()
      const selectedTag = snapshot.data()

      return res.status(200).json({ 
        status: 200,
        message: 'success',
        data: selectedTag,
      })
    } catch (err: any) {
      console.log('error', err.message)
      return res.status(500).json({
        status: 500,
        message: 'Error',
        data: {
          error: err.message,
        },
      })
    }
  }
}