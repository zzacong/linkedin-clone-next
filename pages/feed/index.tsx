import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from '$components/Header'
import Sidebar from '$components/Sidebar'
import Posts from '$components/Posts'
import Widgets from '$components/Widgets'

export default function Feed() {
  return (
    <div className="h-screen overflow-y-scroll bg-[#f3f2ef] dark:bg-black dark:text-white">
      <Head>
        <title>Feed | LinkedIn | Next</title>
      </Head>
      <Header />

      <div className="px-4">
        <div className="mx-auto my-6 grid max-w-xl grid-cols-12 gap-5 md:max-w-3xl lg:max-w-6xl">
          {/* Sidebar */}
          <div className="col-span-12 h-48 bg-red-100 md:col-span-4 lg:col-span-2">
            <Sidebar />
          </div>

          {/* Feed */}
          <main className="col-span-12 h-48 bg-red-100 md:col-span-8 lg:col-span-6">
            <Posts />
          </main>

          {/* Widgets (aside) */}
          <aside className="hidden h-48 bg-red-100 lg:col-span-4 lg:block">
            <Widgets />
          </aside>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return { props: {} }
}
