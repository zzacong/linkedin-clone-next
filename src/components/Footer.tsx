import Image from 'next/image'
import linkedin_footer from '$public/linkedin_footer.svg'
import { HiOutlineChevronDown } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="t-primary mt-4 bg-transparent lg:sticky lg:top-20">
      <ul className="t-secondary my-4 mx-6 flex flex-wrap items-center justify-center text-xs">
        <li className="my-1 mx-2 flex items-center justify-center">
          <a href="#" className="flex">
            About
          </a>
        </li>
        <li className="my-1 mx-2 flex items-center justify-center">
          <a href="#" className="flex">
            Accessibility
          </a>
        </li>
        <li className="my-1 mx-2 flex items-center justify-center">
          <a href="#" className="flex">
            Help Center
          </a>
        </li>
        <li className="my-1 mx-2 flex items-center">
          <a href="#" className="flex">
            Privacy & Terms
          </a>
          <HiOutlineChevronDown className="mui-icon ml-1 h-3 w-3" />
        </li>
        <li className="my-1 mx-2 flex items-center justify-center">
          <a href="#" className="flex">
            Ad Choices
          </a>
        </li>
        <li className="my-1 mx-2 flex items-center justify-center">
          <a href="#" className="flex">
            Advertising
          </a>
        </li>
        <li className="my-1 mx-2 flex items-center justify-center">
          <a href="#" className="flex">
            Business Services
          </a>
          <HiOutlineChevronDown className="mui-icon ml-1 h-3 w-3" />
        </li>
        <li className="my-1 mx-2 flex items-center justify-center">
          <a href="#" className="flex">
            Get the LinkedIn app
          </a>
        </li>
        <li className="my-1 mx-2 flex items-center justify-center">
          <a href="#" className="flex">
            More
          </a>
        </li>
      </ul>
      <div className="flex items-center justify-center text-center">
        <Image
          src={linkedin_footer}
          alt="LinkedIn logo"
          width={56}
          height={14}
        />
        <p className="ml-2 text-xs">LinkedIn Clone © 2022</p>
      </div>
      <div className="pt-4">
        <p className="bg-red-500 px-2 text-center text-sm font-bold text-white">
          NOTE: This is a CLONE only.
        </p>
      </div>
    </footer>
  )
}
