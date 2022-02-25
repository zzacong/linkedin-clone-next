import type { Article } from '$lib/types'
import { atom } from 'recoil'

export const articlesState = atom<Article[]>({
  key: 'articlesState',
  default: [] as Article[],
})
