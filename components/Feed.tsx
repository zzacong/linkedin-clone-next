import AddPost from '$components/AddPost'
import { useQuery } from 'react-query'
import { fetchPosts } from '$lib/utils'
import Post from '$components/Post'

export default function Feed() {
  const {
    data: posts,
    isError,
    isLoading,
    error,
  } = useQuery('posts', fetchPosts, {
    staleTime: 5000,
  })

  return (
    <div className="space-y-4">
      <AddPost />
      <div className="bg-red-100">
        {isLoading && <p>loading...</p>}
        {isError && error instanceof Error && <p>Error: {error?.message}</p>}

        {posts?.map(p => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  )
}
