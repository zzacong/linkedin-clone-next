import type { Post } from '@prisma/client'
import axios from 'axios'
import {
  type FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
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
