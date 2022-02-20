import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

import linkedin_logo from '$public/linkedin_logo.svg'
import google_logo from '$public/Google_logo.svg'

export default function SignIn({ providers }: PageProps) {
  return (
    <div>
      <Head>
        <title>LinkedIn Login, Sign In | Next</title>
      </Head>

      <header>
        <div className="mx-auto flex pl-14 pt-8">
          <Link href="/" passHref>
            <a className="block h-[28px] w-[112px]">
              <Image src={linkedin_logo} alt="LinkedIn logo" />
            </a>
          </Link>
        </div>
      </header>

      <main className="">
        <div className="mx-auto flex h-[467px] w-[400px] flex-col rounded-lg bg-white p-6 shadow-lg">
          <header className="text-gray-900">
            <h1 className="pb-1 text-3xl font-semibold leading-[1.25]">
              Sign in
            </h1>
            <p className="text-sm">Stay updated on your professional world</p>
          </header>

          <div className="flex flex-1 flex-col items-stretch justify-center space-y-4 pt-8">
            {Object.values(providers).map(provider => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: '/feed' })}
                className="flex h-[52px] items-center justify-center rounded-full bg-white px-6 shadow-sm outline outline-1 outline-gray-500 hover:bg-gray-100 hover:outline-2 focus:bg-gray-100 focus:outline-2"
              >
                <Image
                  src={google_logo}
                  alt="Google logo"
                  width={24}
                  height={24}
                />
                <span className="ml-2 text-base font-semibold text-gray-700">
                  Sign in with Google
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const providers = await getProviders()

  return { props: { providers } }
}

type PageProps = {
  providers: ReturnType<typeof getProviders>
}
