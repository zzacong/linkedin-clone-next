import type { AppProps } from 'next/app'
import { useRef } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useWarnClone } from '$lib/hooks'

import '$styles/globals.css'

export default function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const queryClient = useRef(new QueryClient())

  useWarnClone()

  return (
    <>
      <Head>
        <title>LinkedIn Clone | Next</title>
        <meta
          name="description"
          content="A LinkedIn clone built with Next.js for learning purpose. THIS IS NOT THE REAL LinkedIn."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient.current}>
          <Hydrate state={dehydratedState}>
            <ThemeProvider attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
