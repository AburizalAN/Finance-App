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
      const tagsRef = await db.collection('tags').get()
      let data: Array<Object> = []
      let total: number = 0

      // sum total
      const snapshotTotal = await db.collection('pengeluaran').get()
      snapshotTotal.forEach((doc: any) => {
        total += doc.data().value
      })

      const summaryTotalRef = await db.collection('summary_expenses').doc('total')

      await db.runTransaction(async (t) => {
        const newTotal = total
        t.update(summaryTotalRef, { count: newTotal })
      })

      // sum total expenses by tag
      tagsRef.forEach(async (doc) => {
        const tag = doc.data()
        let count: number = 0

        const snapshotByTag = await db.collection('pengeluaran').where('tag.id', '==', parseInt(doc.id)).get()
        snapshotByTag.forEach((doc: any) => {
          count += doc.data().value
        })

        const summaryRef = db.collection('summary_expenses').doc(doc.id)

        await db.runTransaction(async (t) => {
          const newCount = count
          t.update(summaryRef, { count: newCount })
        })
      })

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