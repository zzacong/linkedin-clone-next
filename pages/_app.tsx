import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

import '$styles/globals.css'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>LinkedIn | Next</title>
        <meta
          name="description"
          content="A LinkedIn clone built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}
