import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'services/firebase-admin'
import { formData } from 'services/helper'

export const config = {
  api: {
     bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req
  const incomesRef = db.collection('incomes')
  const kantongRef = db.collection('kantong')

  const { kantong = null }: { kantong?: any } = query

  if (method === 'GET') {
    try {
      let collection: any[] = []
      const snapshot = await incomesRef.get()
      snapshot.forEach((doc: any) => {
        collection.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      return res.status(200).json({ 
        status: 200,
        message: 'success',
        data: collection,
      })
    } catch (err: any) {
      console.log('error', err.message)
      return res.status(500).json({ 
        status: 500,
        message: 'Error',
        data: {
          error: err.message,
        }
      })
    }
  }

  if (method ==='POST') {
    try {
      const data = await formData(req)
      const { fields } = data
      const snapshotKantong = await kantongRef.doc(fields.kantong).get()
      const selectedKantong = snapshotKantong.data()
      const payload: any = {
        from: fields.from,
        date: fields.date,
        value: parseInt(fields.value),
        kantong: {
          id: fields.kantong,
          ...selectedKantong,
        },
      }
      await incomesRef.add(payload).then((response: any) => {
        console.log('success', response.id)

        return res.status(200).json({ 
          status: 200,
          message: 'success',
          data: payload,
        })
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