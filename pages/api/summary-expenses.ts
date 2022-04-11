import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'services/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'GET') {
    try {
      const summaryRef = await db.collection('summary_expenses').get()
      let data: Array<Object> = []

      summaryRef.forEach((doc: any) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      res.status(200).json({
        status: 200,
        message: 'success',
        data,
      })
    } catch (err: any) {
      console.log('error', err.message)
      res.status(500).json({
        status: 500,
        message: 'Error',
        data: {
          error: err.message
        },
      })
    }
  }
}