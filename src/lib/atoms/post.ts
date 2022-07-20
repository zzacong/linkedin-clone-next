import type { Post } from '$lib/types'
import { atom } from 'jotai'

export const modalPostState = atom<Post | undefined>(undefined)
