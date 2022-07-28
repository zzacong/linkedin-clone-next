import { useQuery } from '@tanstack/react-query'
import { MdArrowDropDown } from 'react-icons/md'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { fetchPosts } from '$lib/utils'
import AddPost from '$components/AddPost'
import Post from '$components/Post'

export default function Feed() {
  const {
    data: posts,
    isError,
    isLoading,
    error,
  } = useQuery(['posts'], fetchPosts, {
    staleTime: 5000,
  })
  const [parent] = useAutoAnimate<HTMLDivElement>()

  return (
    <div className="">
      <AddPost />
      <div className="my-2">
        <button className="flex w-full cursor-pointer items-center">
          <hr className="mr-2 h-[1px] flex-grow border-t border-black/10 bg-black/10 dark:border-gray-500 dark:bg-gray-500" />
          <div className="flex items-center">
            <span className="t-secondary text-xs">Sort by</span>
            <span className="mx-1 text-xs font-semibold">Top</span>
            <MdArrowDropDown size={20} className="-ml-1" />
          </div>
        </button>
      </div>
      <div ref={parent} className="space-y-4">
        {isLoading && <p>loading...</p>}
        {isError && error instanceof Error && <p>Error: {error?.message}</p>}

        {posts?.map(p => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  )
}
