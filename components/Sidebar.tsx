import Image from 'next/image'
import premium_icon from '$public/premium.svg'
import { MdBookmark } from 'react-icons/md'

export default function Sidebar() {
  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white text-center dark:border-none dark:bg-dblue">
        <div className="-mr-3 -ml-3 h-14 min-w-full bg-[url('/sidebar_bg.svg')] bg-cover bg-center"></div>

        <button className="-mt-9 cursor-pointer touch-manipulation">
          <Image
            src="https://lh3.googleusercontent.com/pKkYlwlR7NbnX0BVDLNw1p-ktuWEVZUAeKQAh07gN6-MmxqgrO4hEHQCXIFposu71zanaeim1qVnGG5T1-cHB60J5k_XGh21WfJO"
            alt="Profile picture"
            width={64}
            height={64}
            className="rounded-full"
          />
        </button>

        <div className="py-4 px-4">
          <a href="#" className="block">
            <h3 className="cursor-pointer font-semibold decoration-purple-700 underline-offset-1 hover:underline">
              Elon Musk
            </h3>
          </a>
          <p className="text-sm text-black/60 dark:text-white/75">
            elonmusk@gmail.com
          </p>
        </div>

        <div className="hidden text-left text-sm text-gray-500 dark:text-white/75 md:block">
          <div className="sidebar-section py-3">
            <div className="sidebar-btn flex justify-between space-x-2 py-1 text-xs">
              <h4 className="font-semibold">Who viewed your profile</h4>
              <span className="text-blue-500">39</span>
            </div>
            <div className="sidebar-btn flex justify-between space-x-2 py-1 text-xs">
              <h4 className="font-semibold">Views of your post</h4>
              <span className="text-blue-500">629</span>
            </div>
          </div>

          <div className="sidebar-section sidebar-btn py-3 text-xs">
            <h4 className="text-gray-500 dark:text-white/75">
              Access exclusive tools & insights
            </h4>
            <span className="flex items-center space-x-2">
              <Image
                src={premium_icon}
                alt="premium app icon"
                width={16}
                height={16}
              />
              <span className="font-semibold tracking-wide text-blue-500">
                Get Hired Faster, Try Premium Free
              </span>
            </span>
          </div>

          <div className="sidebar-section sidebar-btn flex items-center space-x-1.5 p-3">
            <MdBookmark className="mui-icon h-4 w-4 text-gray-600" />
            <h4 className="text-xs font-semibold dark:text-white">My items</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
