// import type { GetServerSideProps } from 'next'
// import type { AsyncReturnType } from '$lib/types'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

import linkedin_logo from '$public/linkedin_logo.svg'
import google_logo from '$public/Google_logo.svg'
import { useQuery } from '@tanstack/react-query'

export default function SignInPage() {
  const { data: providers } = useQuery(['auth.providers'], getProviders, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return (
    <div className="t-black flex min-h-screen flex-col bg-lstone">
      <Head>
        <title>LinkedIn Clone Login, Sign In | Next</title>
      </Head>

      <header>
        <div className="mx-auto flex pl-14 pt-8">
          <Link href="/" className="block">
            <Image
              src={linkedin_logo}
              alt="LinkedIn logo"
              height={34}
              width={135}
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 flex-grow place-items-center px-4">
        <div className="flex flex-col items-center">
          <h1 className="p-6 text-center text-3xl font-semibold leading-[1.25]">
            Make the most of your professional life
          </h1>

          <div className="flex h-[224px] w-full max-w-xl flex-col rounded-lg bg-white p-6 pt-10 text-center shadow-lg md:w-[432px]">
            <div className="flex flex-1 flex-col items-stretch justify-center space-y-5">
              <button
                onClick={() => alert('Not implemented')}
                className="flex h-[52px] items-center justify-center rounded-full bg-btnblue px-6 shadow-sm hover:bg-btnbluedark focus:bg-btnbluedark"
              >
                <span className="text-sm font-semibold text-white md:text-base">
                  Continue with email
                </span>
              </button>
              {providers &&
                Object.values(providers).map(provider => (
                  <button
                    key={provider.name}
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: '/feed' })
                    }
                    className="flex h-[52px] items-center justify-center rounded-full border border-gray-500 bg-white px-6 shadow-sm hover:border-2  hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <Image
                      src={google_logo}
                      alt="Google logo"
                      width={24}
                      height={24}
                    />
                    <span className="t-black-light ml-2 text-sm font-semibold md:text-base">
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
          <p className="mb-6 text-sm font-semibold">
            Please note this site is a CLONE built for learning purpose only.
          </p>
        </div>
      </main>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const providerEndpoint = new URL(
//     '/api/auth/providers',
//     process.env.NEXTAUTH_URL
//   ).toString()
//   const providers = await fetch(providerEndpoint).then(resp => resp.json())

//   return {
//     props: {
//       providers,
//     },
//   }
// }

// export const config = {
//   runtime: 'experimental-edge',
// }

// interface SignInPageProps {
//   providers: AsyncReturnType<typeof getProviders>
// }
