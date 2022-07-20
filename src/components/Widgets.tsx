import type { Article } from '$lib/types'
import { useState } from 'react'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { BsInfoSquareFill } from 'react-icons/bs'
import { MdCircle } from 'react-icons/md'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'

import { articlesState } from '$lib/atoms'

export default function Widgets() {
  const articles = useAtomValue(articlesState)
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="feed-card py-3">
      <div className="flex items-center px-3">
        <h4 className="flex-grow font-semibold">LinkedIn News</h4>
        <BsInfoSquareFill className="mui-icon h-6 w-4" />
      </div>

      <ul
        className={clsx(
          'my-2 transition-all',
          showMore ? 'h-[476px]' : 'h-[236px]'
        )}
      >
        {articles.slice(0, 5).map(a => (
          <Item key={a.url} article={a} />
        ))}
        {showMore &&
          articles.slice(5, 10).map(a => <Item key={a.url} article={a} />)}
      </ul>

      <button
        onClick={() => setShowMore(p => !p)}
        className="card-btn t-secondary ml-6 flex items-center space-x-1 rounded px-2 py-0.5"
      >
        <span className="text-sm font-semibold">
          {showMore ? 'Show less' : 'Show more'}
        </span>
        {showMore ? (
          <HiOutlineChevronUp className="mui-icon h-5 w-5" />
        ) : (
          <HiOutlineChevronDown className="mui-icon h-5 w-5" />
        )}
      </button>
    </div>
  )
}

const Item = ({ article: a }: { article: Article }) => (
  <li>
    <a
      href={a.url}
      className="card-btn mt-1 block pr-4"
      rel="noreferrer noopener"
      target="_blank"
    >
      <div className="flex items-center">
        <MdCircle className="mui-icon t-secondary mx-3 h-2 w-2 rounded-full" />
        <p className="block max-w-[480px] truncate text-sm font-semibold lg:max-w-[260px]">
          {a.title}
        </p>
      </div>
      <span className="t-secondary block w-full truncate pl-8 text-xs">
        {formatDistanceToNow(parseISO(a.publishedAt), {
          addSuffix: true,
        })}
      </span>
    </a>
  </li>
)
