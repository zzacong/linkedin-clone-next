import type { GetServerSideProps } from 'next'
import type { Article } from '$lib/types'
import Head from 'next/head'
import axios from 'axios'
import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'

import { prisma } from '$lib/config/prisma'
import Feed from '$components/Feed'
import Header from '$components/Header'
import Modal from '$components/Modal'
import Sidebar from '$components/Sidebar'
import Widgets from '$components/Widgets'
import { articlesState } from '$lib/atoms'
import Footer from '$components/Footer'

export default function FeedPage({ articles }: Props) {
  const setArticles = useSetAtom(articlesState)

  useEffect(() => {
    setArticles(articles)
  }, [articles, setArticles])

  return (
    <div className="h-screen overflow-y-scroll bg-lstone transition-all dark:bg-black">
      <Head>
        <title>Feed | LinkedIn Clone | Next</title>
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
          <aside className="block md:hidden lg:block">
            <Widgets />
            <Footer />
          </aside>
        </div>
      </div>
      <Modal />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Check if the user is authenticated on the server...
  const session = await unstable_getServerSession(req, res, authOptions)

  // Get posts on SSR
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['posts'], async () => {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            email: true,
            id: true,
            image: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return posts.map(p => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }))
  })
  const dehydratedState = dehydrate(queryClient)
  queryClient.clear()

  // Get Google News API
  const { data: news } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  )

  return {
    props: {
      session,
      dehydratedState,
      articles: news.articles,
    },
  }
}

type Props = {
  articles: Article[]
}
