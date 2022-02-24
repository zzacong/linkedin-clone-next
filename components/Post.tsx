import type { Post } from '$lib/types'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { useSetRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import {
  MdClose,
  MdOutlineComment,
  MdOutlineThumbUpAlt,
  MdThumbUpAlt,
} from 'react-icons/md'
import { RiSendPlaneFill } from 'react-icons/ri'
import { HiOutlineReply } from 'react-icons/hi'
import { IoIosMore } from 'react-icons/io'

import { modalPostState, modalState, modalTypeState } from '$lib/atoms'
import Avatar from '$components/Avatar'
import { deletePost } from '$lib/utils'

export default function Post({ post, modalPost = false }: Props) {
  const { data: session } = useSession()
  const [liked, setLiked] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const setModalOpen = useSetRecoilState(modalState)
  const setModalType = useSetRecoilState(modalTypeState)
  const setModalPost = useSetRecoilState(modalPostState)

  const onDeletePost = async () => {
    console.log('predelete')
    if (session?.user?.uid !== post.authorId) return
    console.log('delete')
    try {
      setIsDeleting(true)
      await deletePost(post.id)
      setModalOpen(false)
    } catch (error) {
      console.error(error)
      alert(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={clsx(
        !modalPost && 'feed-card rounded-lg',
        modalPost && 'rounded-r-lg'
      )}
    >
      <header className="mb-2 flex flex-nowrap items-center justify-between px-4 pt-3">
        <Link href="#" passHref>
          <a className="flex items-center">
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
          </a>
        </Link>

        <button
          onClick={modalPost ? () => setModalOpen(false) : () => {}}
          className="card-btn -mt-2 self-start rounded-full p-1"
        >
          {modalPost ? (
            <MdClose className="mui-icon" />
          ) : (
            <IoIosMore className="mui-icon" />
          )}
        </button>
      </header>

      <div className="">
        {post.input && (
          <article
            className={clsx(
              'relative mx-4 max-h-14 overflow-hidden break-words text-sm leading-5',
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
            className="mt-2 w-full"
          >
            <Image
              src={post.photoUrl}
              alt={post.input}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
              objectPosition="center"
            />
          </button>
        )}
      </div>

      <div className="mx-3 mt-1 grid grid-flow-col border-t border-black/10	py-1 text-black/60 dark:border-gray-500">
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

        <button
          onClick={onDeletePost}
          disabled={isDeleting}
          className="post-btn card-btn focus:text-red-400 disabled:cursor-not-allowed disabled:text-black/40 dark:disabled:text-white/40"
        >
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
