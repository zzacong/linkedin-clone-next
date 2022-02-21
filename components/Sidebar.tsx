import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { MdAdd, MdBookmark } from 'react-icons/md'

import Avatar from '$components/Avatar'
import premium_icon from '$public/premium.svg'

export default function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="space-y-2">
      {/* First card */}
      <section className="feed-card text-center">
        <div className="-mr-3 -ml-3 h-14 min-w-full bg-[url('/sidebar_bg.svg')] bg-cover bg-center"></div>

        <button
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          className="-mt-9 cursor-pointer touch-manipulation"
        >
          <Avatar w={64} h={64} />
        </button>

        <div className="py-4 px-4">
          <a href="#" className="block">
            <h3 className="cursor-pointer font-semibold decoration-purple-700 underline-offset-1 hover:underline">
              {session?.user?.name}
            </h3>
          </a>
          <p className="t-secondary text-sm">{session?.user?.email}</p>
        </div>

        <div className="hidden text-left text-sm md:block">
          <div className="sidebar-section py-3">
            <a
              href="#"
              className="sidebar-btn card-btn flex justify-between space-x-2 py-1 text-xs"
            >
              <h4 className="t-secondary font-semibold">
                Who viewed your profile
              </h4>
              <span className="t-link">39</span>
            </a>
            <a
              href="#"
              className="sidebar-btn card-btn flex justify-between space-x-2 py-1 text-xs"
            >
              <h4 className="t-secondary font-semibold">Views of your post</h4>
              <span className="t-link">629</span>
            </a>
          </div>

          <a
            href="#"
            className="sidebar-section sidebar-btn card-btn py-3 text-xs"
          >
            <h4 className="t-secondary">Access exclusive tools & insights</h4>
            <span className="flex items-center space-x-2">
              <Image
                src={premium_icon}
                alt="premium app icon"
                width={16}
                height={16}
              />
              <span className="t-link font-semibold">
                Get Hired Faster, Try Premium Free
              </span>
            </span>
          </a>

          <a
            href="#"
            className="sidebar-section sidebar-btn card-btn flex items-center space-x-1.5 p-3"
          >
            <MdBookmark className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-xs font-semibold">My items</h4>
          </a>
        </div>
      </section>

      {/* Second card */}
      <section className="feed-card sticky top-20 hidden pt-2 md:block">
        <a href="#" className="t-link sidebar-link">
          <h4>Groups</h4>
        </a>
        <div className="sidebar-link flex items-center justify-between">
          <a href="#" className="t-link flex-grow">
            <h4>Events</h4>
          </a>
          <span className="cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-600">
            <MdAdd className="mui-icon t-secondary" />
          </span>
        </div>
        <a href="#" className="t-link sidebar-link">
          <h4>Followed Hashtags</h4>
        </a>
        <a className="sidebar-section sidebar-btn card-btn mt-2 p-3">
          <h4 className="t-secondary text-sm font-semibold">Discover more</h4>
        </a>
      </section>
    </div>
  )
}
