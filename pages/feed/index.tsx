import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from '$components/Header'
import Sidebar from '$components/Sidebar'
import Posts from '$components/Posts'
import Widgets from '$components/Widgets'

export default function Feed() {
  return (
    <div className="h-screen overflow-y-scroll bg-[#f3f2ef] dark:bg-black">
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
            <Posts />
          </main>

          {/* Widgets (aside) */}
          <aside className="hidden lg:block">
            <Widgets />
          </aside>
        </div>
      </div>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   return { props: {} }
// }
