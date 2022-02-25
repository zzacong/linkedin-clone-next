import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: any) {
  if (req.page.name === '/') {
    const token = await getToken({ req })
    const url = req.nextUrl.clone()
    url.pathname = '/feed'
    if (token) return NextResponse.redirect(url)
  }
}
