import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'services/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'GET') {
    try {
      const summaryRef = await db.collection('summary_incomes').get()
      const kantongRef = await db.collection('kantong').get()
      let data: Array<Object> = []
      let total: number = 0

      // sum total
      const snapshotTotal = await db.collection('incomes').get()
      snapshotTotal.forEach((doc: any) => {
        total += doc.data().value
      })

      const summaryTotalRef = db.collection('summary_incomes').doc('total')
      summaryTotalRef.get().then(async (docSnapshot) => {
        if (docSnapshot.exists) {
          await db.runTransaction(async (t) => {
            const newTotal = total
            t.update(summaryTotalRef, { amount: newTotal })
          })
        } else {
          await db.collection('summary_incomes').doc('total').set({
            amount: total,
          })
        }
      })

      // sum total incomes by kantong
      kantongRef.forEach(async (doc) => {
        const kantongData = doc.data()
        let amount: number = 0

        const snapshotByKantong = await db.collection('incomes').where('kantong.id', '==', doc.id).get()
        snapshotByKantong.forEach((doc: any) => {
          amount += doc.data().value
        })

        const summaryByKantongRef = db.collection('summary_incomes').doc(doc.id)

        summaryByKantongRef.get().then(async (docSnapshot) => {
          if (docSnapshot.exists) {
            await db.runTransaction(async (t) => {
              const newAmount = amount
              t.update(summaryByKantongRef, { amount: newAmount })
            })
          } else {
            await db.collection('summary_incomes').doc(doc.id).set({
              ...kantongData,
              amount,
            })
          }
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