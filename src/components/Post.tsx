import type { Post } from '$lib/types'
import { Fragment, type ReactNode, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { useSetAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { Menu, Transition } from '@headlessui/react'
import {
  MdClose,
  MdOutlineComment,
  MdOutlineThumbUpAlt,
  MdThumbUpAlt,
  MdEdit,
  MdDelete,
} from 'react-icons/md'
import { RiSendPlaneFill } from 'react-icons/ri'
import { HiOutlineReply } from 'react-icons/hi'
import { IoIosMore } from 'react-icons/io'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { modalPostState, modalState, modalTypeState } from '$lib/atoms'
import Avatar from '$components/Avatar'
import { deletePost } from '$lib/utils'
import { IconType } from 'react-icons'
import { storage } from '$lib/config/firebase'

export default function Post({ post, modalPost = false }: Props) {
  const [liked, setLiked] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const setModalOpen = useSetAtom(modalState)
  const setModalType = useSetAtom(modalTypeState)
  const setModalPost = useSetAtom(modalPostState)

  return (
    <div
      className={clsx(
        !modalPost && 'feed-card rounded-lg',
        modalPost && 'rounded-r-lg'
      )}
    >
      <header className="mb-2 flex flex-nowrap items-center justify-between px-4 pt-3">
        <Link href="#" className="flex items-center">
          <span className="flex">
            <Avatar size={40} />
          </span>
          <div className="ml-2 flex-grow leading-5">
            <p className="t-link dark:t-white hover:t-blue dark:hover:t-blue-light font-semibold text-black/90">
              {post.author.name}
            </p>
            <p className="t-secondary text-xs">
              {formatDistanceToNow(parseISO(post.createdAt as string), {
                addSuffix: true,
              })}
            </p>
          </div>
        </Link>

        {modalPost ? (
          <button
            onClick={() => setModalOpen(false)}
            className="card-btn -mt-2 self-start rounded-full p-1"
          >
            <MdClose className="mui-icon" />
          </button>
        ) : (
          <PostMenu post={post} />
        )}
      </header>

      <div>
        {post.input && (
          <article
            className={clsx(
              'relative mx-4 mb-2 max-h-14 overflow-hidden break-words text-sm leading-5',
              showAll && 'max-h-[none]',
              modalPost && 'max-h-72 overflow-y-auto'
            )}
          >
            <p className="">{post.input}</p>

            {!modalPost && !showAll && post.input.length > 220 && (
              <button
                onClick={() => setShowAll(true)}
                className="t-secondary hover:t-blue dark:text-t-blue-light absolute -bottom-1 right-0 inline-block bg-white pl-2 hover:underline dark:bg-dblue"
              >
                ...see more
              </button>
            )}
          </article>
        )}

        {post.photoUrl && !modalPost && (
          <button
            onClick={() => {
              setModalOpen(true)
              setModalType('gifYouUp')
              setModalPost(post)
            }}
            className="my-4 block w-full"
          >
            <Image
              src={post.photoUrl}
              alt={post.input}
              width={556}
              height={556}
              priority
              className="max-h-[556px] object-contain"
            />
          </button>
        )}
      </div>

      <div className="mx-3 grid grid-flow-col border-t border-black/10	py-1 text-black/60 dark:border-gray-500">
        <button
          className={clsx('post-btn card-btn', liked && 'text-blue-500')}
          onClick={() => setLiked(p => !p)}
        >
          {liked ? (
            <MdThumbUpAlt className="mui-icon mr-1 -scale-x-100" />
          ) : (
            <MdOutlineThumbUpAlt className="mui-icon mr-1 -scale-x-100" />
          )}
          <span>Like</span>
        </button>

        <button className="post-btn card-btn">
          <MdOutlineComment className="mui-icon mr-1" />
          <span>Comment</span>
        </button>

        <button className="post-btn card-btn">
          <HiOutlineReply className="mui-icon mr-1 -scale-x-100" />
          <span>Share</span>
        </button>

        <button className="post-btn card-btn">
          <RiSendPlaneFill className="mui-icon mr-1" />
          <span>Send</span>
        </button>
      </div>
    </div>
  )
}

type Props = {
  post: Post
  modalPost?: boolean
}

const PostMenu = ({ post }: { post: Props['post'] }) => {
  const client = useQueryClient()
  const { mutate } = useMutation(deletePost, {
    onMutate: () => setIsDeleting(true),
    onSuccess: deletedPost => {
      setModalOpen(false)
      client.setQueryData<Post[]>(['posts'], posts =>
        posts ? posts.filter(p => p.id !== deletedPost.id) : []
      )
    },
    onError: error => {
      console.error(error)
      alert(error)
    },
    onSettled: () => {
      setIsDeleting(false)
    },
  })
  const { data: session } = useSession()
  const setModalOpen = useSetAtom(modalState)
  const [isDeleting, setIsDeleting] = useState(false)

  const onDeletePost = useCallback(async () => {
    if (session?.user?.uid !== post.authorId) return
    mutate({ post, storage })
  }, [mutate, post, session?.user?.uid])

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="card-btn -mt-2 self-start rounded-full p-1">
        <IoIosMore className="mui-icon" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition duration-150 ease-out"
        enterFrom="scale-90 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-150 ease-in"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-90 opacity-0"
      >
        <Menu.Items className="absolute right-0 top-10 z-40 flex w-48 origin-top-right flex-col items-stretch rounded-lg rounded-tr-none border bg-white py-1 shadow-lg outline-offset-2 dark:border-gray-500 dark:bg-dblue">
          <MenuButton Icon={MdEdit}>Edit post</MenuButton>
          <MenuButton
            onClick={onDeletePost}
            Icon={MdDelete}
            disabled={isDeleting}
          >
            Delete post
          </MenuButton>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const MenuButton = ({
  children,
  Icon,
  onClick,
  disabled = false,
}: MenuButtonProps) => (
  <Menu.Item disabled={disabled}>
    {({ active, disabled }) => (
      <button
        onClick={onClick}
        className={clsx(
          'card-btn t-secondary flex cursor-pointer items-center px-4 py-2 transition-colors duration-200',
          active && 'bg-black/5 dark:bg-gray-100/10',
          disabled && 'cursor-not-allowed text-black/40 dark:text-white/40'
        )}
      >
        <Icon size={20} className="" />
        <span className="ml-2 flex-grow text-left font-semibold">
          {children}
        </span>
      </button>
    )}
  </Menu.Item>
)

type MenuButtonProps = {
  children: ReactNode
  Icon: IconType
  disabled?: boolean
  onClick?: () => void
}
