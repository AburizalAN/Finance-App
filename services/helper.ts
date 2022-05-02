import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { OAuth2Client } from 'google-auth-library'

export const formData = (req: NextApiRequest): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err: Object, fields: Object, files: Object) => {
      if (err) return reject(err)
      return resolve({ fields, files })
    })
  })
}

export const decodeIDToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new OAuth2Client(process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID)
  
  try {
    const { authorization }: any = req.headers
    console.log('authorization', authorization)
    const token = authorization.split(' ')[1]
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID
    });
    const decodeToken = ticket.getPayload()
    return { success: true, data: decodeToken }
  } catch (err: any) {
    return { success: false, data: err }
  }
}