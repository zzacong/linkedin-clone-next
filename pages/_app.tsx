import type { AppProps } from 'next/app'
import { useRef, useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import '$styles/globals.css'

export default function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const queryClient = useRef(new QueryClient())

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
        <QueryClientProvider client={queryClient.current}>
          <Hydrate state={dehydratedState}>
            <ThemeProvider attribute="class">
              <RecoilRoot>
                <Component {...pageProps} />
              </RecoilRoot>
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
