import Image from 'next/image'
import {
  MdExplore,
  MdGroup,
  MdOndemandVideo,
  MdBusinessCenter,
} from 'react-icons/md'

import HeaderLink from '$components/HeaderLink'
import linkedin_logo from '$public/linkedin_logo.svg'

export default function Home() {
  return (
    <div>
      <header className="flex items-center justify-around py-4">
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
      </header>
    </div>
  )
}
