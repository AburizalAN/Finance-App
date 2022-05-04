// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeIDToken } from 'services/helper'
import { db } from 'services/firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'
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
  const decodeToken = await decodeIDToken(req, res)

  if (decodeToken.success) {
    if (method === 'POST') {
      try {
        const data = await formData(req)
        const { fields } = data
        const snapshot = await tagsRef.doc(fields.tag).get()
        const selectedTag = snapshot.data()
        const payload: any = {
          label: fields.label,
          date: Timestamp.fromDate(new Date(fields.date)),
          value: parseInt(fields.value),
          tag: {
            id: parseInt(fields.tag),
            ...selectedTag,
          },
          user: {
            sub: decodeToken.data.sub,
            name: decodeToken.data.name,
          }
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
        const snapshotExpense = tag 
          ? await pengeluaranRef.where('user.sub', '==', decodeToken.data.sub).where('tag.id', '==', parseInt(tag)).get()
          : await pengeluaranRef.where('user.sub', '==', decodeToken.data.sub).get()
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
  } else {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
      data: {
        error: 'Unauthorized',
      },
    })
  }
}