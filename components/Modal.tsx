import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { MdArrowDropDown, MdClose, MdPublic } from 'react-icons/md'

import Avatar from '$components/Avatar'
import AddPostForm from '$components/AddPostForm'
import { modalState } from '$lib/atoms'

export default function Modal({ type = 'dropIn' }: Props) {
  const [isClient, setIsClient] = useState(false)
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  useEffect(() => setIsClient(true), [])

  if (!isClient) return null

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50"
        >
          <Dialog.Overlay
            as={motion.div}
            // onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="flex min-h-screen items-center justify-center">
            {type === 'dropIn' && (
              <motion.div
                className="t-primary mx-6 flex max-h-[calc(100vh-160px)] w-full max-w-xl flex-col justify-center overflow-y-hidden rounded-xl bg-white dark:bg-dblue"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <header className="flex items-center justify-between border-b border-black/10 py-4 pl-6 pr-4 dark:border-gray-500">
                  <Dialog.Title className="text-xl">Create a post</Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Create a new LinkedIn post
                  </Dialog.Description>
                  <CloseButton />
                </header>

                <AddPostForm />
              </motion.div>
            )}

            {type == 'gifYouUp' && (
              <motion.div
                variants={gifYouUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative mx-6 flex h-screen max-h-[calc(100vh-160px)] w-full max-w-6xl rounded-lg"
              >
                <Dialog.Title className="sr-only">View post</Dialog.Title>
                <Dialog.Description className="sr-only">
                  View a post
                </Dialog.Description>
                {/* left panel */}
                <div className="relative h-full flex-grow rounded-l-lg bg-dblue">
                  <Image
                    src="https://images.unsplash.com/photo-1645363710209-aad3e68d0e6f"
                    alt="placeholder image"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <div className="w-1/3 rounded-r-lg bg-white dark:border-l dark:border-gray-500 dark:bg-dblue">
                  {/* <Post post={post} modalPost /> */}
                  <div className="flex items-center justify-between pl-4 pr-2 pt-2">
                    <span />
                    <CloseButton />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

const CloseButton = () => {
  const setIsOpen = useSetRecoilState(modalState)

  return (
    <button
      onClick={() => setIsOpen(false)}
      className="card-btn rounded-full p-2"
    >
      <MdClose className="t-secondary h-7 w-7" />
    </button>
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
