import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { prisma } from '$lib/config/prisma'
import Feed from '$components/Feed'
import Header from '$components/Header'
import Modal from '$components/Modal'
import Sidebar from '$components/Sidebar'
import Widgets from '$components/Widgets'
import { dehydrate, QueryClient } from 'react-query'

export default function FeedPage() {
  return (
    <div className="h-screen overflow-y-scroll bg-lstone transition-all dark:bg-black">
      <Head>
        <title>Feed | LinkedIn | Next</title>
      </Head>
      <Header />
      <div className="px-4">
        <div className="mx-auto my-6 grid max-w-xl grid-cols-1 gap-5 md:max-w-3xl md:grid-cols-[7fr_17fr] lg:max-w-6xl lg:grid-cols-[5fr_12fr_7fr]">
          {/* Sidebar */}
          <Sidebar />

          {/* Feed */}
          <main>
            <Feed />
          </main>

          {/* Widgets (aside) */}
          <aside className="hidden lg:block">
            <Widgets />
          </aside>
        </div>
      </div>
      <Modal type="dropIn" />
      {/* <Modal type="gifYouUp" /> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  // Check if the user is authenticated on the server...
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  // Get posts on SSR
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', async () =>
    prisma.post.findMany({
      select: {
        id: true,
        input: true,
      },

      orderBy: { createdAt: 'desc' },
    })
  )
  const dehydratedState = dehydrate(queryClient)
  queryClient.clear()

  // // Get Google News API
  // const results = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  // ).then(res => res.json())

  return {
    props: {
      session,
      dehydratedState,
      // articles: results.articles,
    },
  }
}
