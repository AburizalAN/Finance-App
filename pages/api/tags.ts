import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'services/firebase-admin'
import { formData } from 'services/helper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  const tagsRef = db.collection('tags')

  if (method === 'GET') {
    try {
      let collection: any[] = []
      const snapshot = await tagsRef.get()
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
      return res.status(500).json({ error: err.message })
    }
  }

  if (method === 'POST') {
    try {
      const data = await formData(req)
      const { fields } = data
      const payload = {
        name: fields.name,
        icon: fields.icon,
        color: fields.color,
      }
      await tagsRef.add(payload).then((response: any) => {
        console.log('success', response.id)
        return res.status(200).json({
          status: 200,
          message: 'success',
          data: payload,
        })
      });
    } catch (err: any) {
      console.log('error', err.message)
      return res.status(500).json({ error: err.message })
    }
  }
}