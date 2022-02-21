import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { MdArrowDropDown, MdClose, MdPublic } from 'react-icons/md'

import Avatar from '$components/Avatar'
import { modalState } from '$lib/atoms'

export default function Modal({ type = 'dropIn' }: Props) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <Dialog.Overlay
            as={motion.div}
            className="fixed inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="flex min-h-screen items-center justify-center">
            {type === 'dropIn' && (
              <motion.div
                className="t-primary mx-6 mt-36 flex w-full max-w-xl flex-col justify-center self-start rounded-xl bg-white dark:bg-dblue"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center justify-between border-b border-black/10 py-4 pl-6 pr-4 dark:border-gray-500">
                  <Dialog.Title className="text-xl">Create a post</Dialog.Title>
                  <Dialog.Description className="hidden">
                    Create a new LinkedIn post
                  </Dialog.Description>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="card-btn rounded-full p-2"
                  >
                    <MdClose className="t-secondary h-7 w-7" />
                  </button>
                </div>

                <div className="space-y-2 p-4">
                  <div className="flex items-center space-x-2">
                    <Avatar w={44} h={44} />
                    <div className="flex flex-col justify-center">
                      <h3 className="mb-1 text-base font-semibold">
                        {session?.user?.name}
                      </h3>
                      <button className="card-btn t-secondary flex items-center justify-center rounded-full border border-black/60 px-3 py-1 dark:border-gray-500">
                        <MdPublic size={16} />
                        <span className="px-2 font-semibold">Anyone</span>
                        <MdArrowDropDown size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {type == 'gifYouUp' && (
              <motion.div
                variants={gifYouUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mx-6 flex h-screen max-h-[calc(100vh-160px)] w-full max-w-6xl rounded-lg bg-dblue"
              >
                {/* left panel */}
                <motion.div className="relative h-full flex-grow rounded-l-lg bg-inherit">
                  <Image
                    src="https://images.unsplash.com/photo-1645363710209-aad3e68d0e6f"
                    alt="placeholder image"
                    layout="fill"
                    objectFit="contain"
                  />
                </motion.div>

                <div className="w-1/3 rounded-r-lg bg-white dark:bg-dblue">
                  {/* <Post post={post} modalPost /> */}
                </div>
              </motion.div>
            )}
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
}

type Props = {
  type?: 'dropIn' | 'gifYouUp'
}
