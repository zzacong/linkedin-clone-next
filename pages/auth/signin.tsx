import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

import linkedin_logo from '$public/linkedin_logo.svg'
import google_logo from '$public/Google_logo.svg'

export default function SignIn({ providers }: PageProps) {
  return (
    <div className="t-primary flex min-h-screen flex-col bg-lstone">
      <Head>
        <title>LinkedIn Login, Sign In | Next</title>
      </Head>

      <header className="">
        <div className="mx-auto flex pl-14 pt-8">
          <Link href="/" passHref>
            <a className="block">
              <Image
                src={linkedin_logo}
                alt="LinkedIn logo"
                height={34}
                width={135}
              />
            </a>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid min-h-screen w-full max-w-6xl flex-grow place-items-center">
        <div className="flex flex-col items-center">
          <h1 className="p-6 text-3xl font-semibold leading-[1.25]">
            Make the most of your professional life
          </h1>
          <div className="flex h-[224px] w-[432px] max-w-xl flex-col rounded-lg bg-white p-6 pt-10 text-center shadow-lg">
            <div className="flex flex-1 flex-col items-stretch justify-center space-y-5">
              <button
                onClick={() => alert('Not implemented')}
                className="flex h-[52px] items-center justify-center rounded-full bg-btnblue px-6 shadow-sm hover:bg-btnbluedark focus:bg-btnbluedark"
              >
                <span className="text-base font-semibold text-white">
                  Continue with email
                </span>
              </button>
              {Object.values(providers).map(provider => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: '/feed' })}
                  className="flex h-[52px] items-center justify-center rounded-full border border-gray-500 bg-white px-6 shadow-sm  hover:border-2 hover:bg-gray-100 focus:bg-gray-100 "
                >
                  <Image
                    src={google_logo}
                    alt="Google logo"
                    width={24}
                    height={24}
                  />
                  <span className="t-secondary ml-2 text-base font-semibold">
                    Continue with {provider.name}
                  </span>
                </button>
              ))}
            </div>
            <p className="pt-4">
              Already on LinkedIn?{' '}
              <a href="#" className="t-link font-semibold">
                Sign in
              </a>
            </p>
          </div>
          <p className="m-6 pt-4 text-xs">
            Looking to create a page for a business?{' '}
            <a href="#" className="t-link font-semibold">
              Get help
            </a>
          </p>
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
