import formidable from 'formidable'
import type { NextApiRequest } from 'next'

export const formData = (req: NextApiRequest): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err: Object, fields: Object, files: Object) => {
      if (err) return reject(err)
      return resolve({ fields, files })
    })
  })
}