import AddPost from '$components/AddPost'

export default function Feed() {
  return (
    <div className="space-y-4">
      <AddPost />
      <div className="bg-red-100">Feed</div>
    </div>
  )
}
