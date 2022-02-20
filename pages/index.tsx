import Head from 'next/head'
import Image from 'next/image'
import {
  MdExplore,
  MdGroup,
  MdOndemandVideo,
  MdBusinessCenter,
  MdArrowForwardIos,
} from 'react-icons/md'

import HeaderLink from '$components/HeaderLink'
import linkedin_logo from '$public/linkedin_logo.svg'
import hero_svg from '$public/hero.svg'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>LinkedIn: Log In or Sign Up | Next</title>
        <meta
          name="description"
          content="A LinkedIn clone built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav className="mx-auto flex max-w-6xl items-center justify-between py-4 px-4">
          <div className="h-10 w-36">
            <Image
              src={linkedin_logo}
              alt="LinkedIn logo"
              width={144}
              height={40}
              objectFit="contain"
            />
          </div>

          <div className="flex items-center divide-gray-300 sm:divide-x">
            <div className="hidden space-x-8 pr-4 sm:flex">
              {/* Header links */}
              <HeaderLink feed Icon={MdExplore}>
                Discover
              </HeaderLink>
              <HeaderLink Icon={MdGroup}>People</HeaderLink>
              <HeaderLink Icon={MdOndemandVideo}>Learning</HeaderLink>
              <HeaderLink Icon={MdBusinessCenter}>Jobs</HeaderLink>
            </div>
            <div className="pl-4">
              <button className="rounded-full border border-blue-700 px-5 py-1.5 font-semibold text-blue-700 transition-all hover:border-2">
                Sign in
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex flex-col items-center overflow-hidden ">
        <section className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col flex-nowrap items-center px-4 pt-10 md:flex-row">
          <div className="w-full flex-shrink-0 space-y-6 self-start pr-0 md:w-[55%] md:pr-12 lg:space-y-10">
            <h1 className="max-w-xl text-3xl font-extralight !leading-snug text-amber-800/80 md:text-5xl">
              Welcome to your professional community
            </h1>

            <div className="space-y-4">
              <div className="intent">
                <h2 className="text-xl">Search for a job</h2>
                <MdArrowForwardIos className="mui-icon text-gray-700" />
              </div>
              <div className="intent">
                <h2 className="text-xl">Find a person you know</h2>
                <MdArrowForwardIos className="mui-icon text-gray-700" />
              </div>
              <div className="intent">
                <h2 className="text-xl">Learn a new skill</h2>
                <MdArrowForwardIos className="mui-icon text-gray-700" />
              </div>
            </div>
          </div>

          <div className="static -z-[1] mt-8 block h-[214px] w-[374px] flex-shrink md:relative md:mt-0 md:min-h-[540px] md:min-w-[700px]">
            <Image
              src={hero_svg}
              alt="Welcome to your professional community"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  )
}
