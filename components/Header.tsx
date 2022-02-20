import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import {
  MdApps,
  MdBusinessCenter,
  MdChat,
  MdGroup,
  MdHome,
  MdNotifications,
  MdSearch,
} from 'react-icons/md'

import HeaderLink from '$components/HeaderLink'
import Avatar from '$components/Avatar'
import linkedin_icon from '$public/linkedin_icon.png'
import linkedin_icon_white from '$public/linkedin_icon_white.png'

export default function Header() {
  // const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()

  // useEffect(() => setMounted(true), [])
  console.log(theme, resolvedTheme)

  return (
    <header className="sticky top-0 z-40 bg-white px-4 focus-within:shadow dark:bg-[#1d2226]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-1">
        {/* Left */}
        <div className="flex w-full max-w-xs items-center space-x-2">
          {resolvedTheme === 'dark' ? (
            <Image
              src={linkedin_icon_white}
              alt="LinkedIn logo"
              width={34}
              height={34}
            />
          ) : (
            <Image
              src={linkedin_icon}
              alt="LinkedIn logo"
              width={34}
              height={34}
            />
          )}

          <div className="flex h-8 w-full items-center space-x-1 rounded bg-slate-100 py-2 px-4 dark:md:bg-gray-700">
            <MdSearch className="mui-icon h-5 w-5" />
            <input
              type="text"
              placeholder="Search"
              className="hidden flex-grow border-none bg-transparent text-sm placeholder-black/75 focus:outline-none dark:placeholder-white/75 md:inline-flex"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-6">
          <HeaderLink Icon={MdHome} feed active>
            Home
          </HeaderLink>
          <HeaderLink Icon={MdGroup} feed>
            My Network
          </HeaderLink>
          <HeaderLink Icon={MdBusinessCenter} feed hidden>
            Jobs
          </HeaderLink>
          <HeaderLink Icon={MdChat} feed>
            Messaging
          </HeaderLink>
          <HeaderLink Icon={MdNotifications} feed>
            Notifications
          </HeaderLink>
          <HeaderLink Icon={Avatar} feed avatar hidden>
            Me
          </HeaderLink>
          <HeaderLink Icon={MdApps} feed hidden>
            Work
          </HeaderLink>

          {/* Dark mode toggle */}
          <button
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
            className={clsx(
              'relative flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full bg-gray-600 px-0.5',
              resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'
            )}
          >
            <span className="absolute left-0.5">🌜</span>
            <motion.div
              className="z-40 h-5 w-5 rounded-full bg-white"
              layout
              transition={spring}
            />
            <span className="absolute right-1">🌞</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}
