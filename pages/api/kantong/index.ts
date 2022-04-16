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
  const { method } = req
  const kantongRef = db.collection('kantong')

  if (method === 'GET') {
    try {
      let collection: any[] = []
      const snapshot = await kantongRef.get()
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
        },  
      })
    }
  }

  if (method === 'POST') {
    try {
      console.log('test api kantong')
      const data = await formData(req)
      const { fields } = data
      const payload = {
        name: fields.name,
        category: fields.category,
      }
      await kantongRef.add(payload).then((response: any) => {
        console.log('success', response.id)
        return res.status(200).json({
          status: 200,
          message: 'success',
          data: payload,
        })
      });
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