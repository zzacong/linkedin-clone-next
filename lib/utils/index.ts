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
