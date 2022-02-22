import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'

import Feed from '$components/Feed'
import Header from '$components/Header'
import Modal from '$components/Modal'
import Sidebar from '$components/Sidebar'
import Widgets from '$components/Widgets'

export default function FeedPage() {
  const { data: session } = useSession()

  console.log('session', session)

  return (
    <div className="h-screen overflow-y-scroll bg-lstone transition-all dark:bg-black">
      <Head>
        <title>Feed | LinkedIn | Next</title>
      </Head>
      <Header />
      <div className="px-4">
        <div className="mx-auto my-6 grid max-w-xl grid-cols-1 gap-5 md:max-w-3xl md:grid-cols-[7fr_17fr] lg:max-w-6xl lg:grid-cols-[5fr_12fr_7fr]">
          {/* Sidebar */}
          <div className="">
            <Sidebar />
          </div>

          {/* Feed */}
          <main className="">
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

  // // Get posts on SSR
  // const { db } = await connectToDatabase()
  // const posts = await db
  //   .collection('posts')
  //   .find()
  //   .sort({ timestamp: -1 })
  //   .toArray()

  // // Get Google News API
  // const results = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  // ).then(res => res.json())

  return {
    props: {
      session,
      // articles: results.articles,
      // posts: posts.map(post => ({
      //   _id: post._id.toString(),
      //   input: post.input,
      //   photoUrl: post.photoUrl,
      //   username: post.username,
      //   email: post.email,
      //   userImg: post.userImg,
      //   createdAt: post.createdAt,
      // })),
    },
  }
}
