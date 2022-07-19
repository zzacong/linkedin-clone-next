import type { Article } from '$lib/types'
import { atom } from 'jotai'

export const articlesState = atom<Article[]>([])
