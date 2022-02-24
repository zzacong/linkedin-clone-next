import type { Post } from '$lib/types'
import { atom } from 'recoil'

export const modalPostState = atom<Post | undefined>({
  key: 'modalPostState',
  default: undefined,
})
