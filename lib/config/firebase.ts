import { initializeApp, getApps, getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? '{}')

export const app = getApps().length ? getApp() : initializeApp(config)
export const storage = getStorage()
