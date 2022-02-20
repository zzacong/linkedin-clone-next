import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import '$styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
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

      <ThemeProvider attribute="class">
        {/* <ThemeProvider> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
