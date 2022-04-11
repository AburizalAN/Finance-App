import { initializeApp, cert, applicationDefault, getApps } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'


if (!getApps().length) {
  initializeApp({
    credential: applicationDefault()
  });
}

export const db = getFirestore();