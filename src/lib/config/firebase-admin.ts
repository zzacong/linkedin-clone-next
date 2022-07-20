import { initializeApp, getApp, getApps, cert } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'

const cred = JSON.parse(process.env.FIREBASE_SERVICE_CRED ?? '')

if (getApps().length) getApp()
else
  initializeApp({
    credential: cert(cred),
    storageBucket: 'gs://linkedin-clone-nextjs-153a4.appspot.com',
  })

export const bucket = getStorage().bucket()
