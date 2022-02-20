import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from '$components/Header'

export default function Feed() {
  return (
    <div>
      <Head>
        <title>Feed | LinkedIn | Next</title>
      </Head>
      <Header />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return { props: {} }
}
