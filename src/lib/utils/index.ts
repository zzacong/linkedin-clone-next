import type { Post } from '$lib/types'
import axios from 'axios'
import {
  type FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

export async function uploadImage(
  storage: FirebaseStorage,
  image: File,
  userId: string,
  postId: string
) {
  const [, ext] = image.name.split('.')
  const imageRef = ref(storage, `posts/${userId}/${postId}.${ext}`)
  await uploadBytes(imageRef, image)
  return getDownloadURL(imageRef)
}

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await axios.get('/api/posts')
  return data
}

export async function fetchPost(id: number): Promise<Post> {
  const { data } = await axios.get(`/api/posts/${id}`)
  return data
}

export async function deletePost({
  post,
  storage,
}: {
  post: Post
  storage: FirebaseStorage
}) {
  const ext = post.photoUrl?.match(/\.(png|jpg|jpeg)\?/)?.[1]
  if (ext)
    await deleteObject(ref(storage, `posts/${post.authorId}/${post.id}.${ext}`))
  const { data } = await axios.delete(`/api/posts/${post.id}`)
  return data
}
