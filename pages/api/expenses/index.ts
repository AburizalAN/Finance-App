// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  const pengeluaranRef = db.collection('pengeluaran')
  const tagsRef = db.collection('tags')

  const { tag = null }: { tag?: any } = query

  if (method === 'POST') {
    try {
      const data = await formData(req)
      const { fields } = data
      const snapshot = await tagsRef.doc(fields.tag).get()
      const selectedTag = snapshot.data()
      const payload: any = {
        label: fields.label,
        date: fields.date,
        value: parseInt(fields.value),
        tag: {
          id: parseInt(fields.tag),
          ...selectedTag,
        },
      }
      await pengeluaranRef.add(payload).then(async (response: any) => {
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

  if (method === 'GET') {
    try {
      let collection: any[] = []
      const snapshotExpense = tag ? await pengeluaranRef.where('tag.id', '==', parseInt(tag)).get() : await pengeluaranRef.get()
      snapshotExpense.forEach((doc: any) => {
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
}