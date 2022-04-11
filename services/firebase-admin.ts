import { initializeApp, cert, applicationDefault, getApps } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_project_id,
      clientEmail: process.env.FIREBASE_client_email,
      privateKey: process.env.FIREBASE_private_key?.replace(/\\n/g, '\n'),
    })
  });
}

export const db = getFirestore();